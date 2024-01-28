import { Request, Response } from 'express';
import logger from "../logger/pino";
import TodoModel, { Todo } from '../model/todo_model';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: Todo[] = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error ' });
    }
};


// create to-do
export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, date } = req.body;
        
        // Parse the date string into a Date object
        const [day, month, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        console.log(parsedDate)

        const todo: Todo = new TodoModel({ title, description, date: parsedDate });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error facing problem while creating user' });
    }
};

// delete to-do
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await TodoModel.findByIdAndDelete(id);
        res.status(204).end();
        
    } catch (error) {
        logger.error('Error while deleting todo:', error);
        res.status(500).json({ error: 'facing Error while deleting user' });
    }
};
// get Completed To-do Sorted By Date

export const CompletedTodo = async (req: Request, res: Response) => {
    try {
        // Query the database for completed todos sorted by date in descending order
        const completedTodos: Todo[] = await TodoModel.find({ completed: true })
            .sort({ date: -1 })
            .exec();
            
        res.json(completedTodos);
    } catch (error) {
        // Handle errors
        logger.error('Error retrieving completed todos:', error);
        res.status(500).json({ error: 'Internal Server Error: Completed did not respond' });
    }
};

// create controller for 7 different date in descending order

// get Incomplete To-do Sorted By Date

// export const IncompleteTodo = async (req: Request, res: Response) => {
//     try {
//         // Query the database for incomplete todos sorted by date in descending order
//         const incompleteTodos: Todo[] = await TodoModel.find({ completed: false })
//             .sort({ date: -1 })
//             .exec();

//         res.json(incompleteTodos);
//     } catch (error) {
//         // Handle errors
//         console.error('Error retrieving incomplete todos:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
export const IncompleteTodo = async (req: Request, res: Response) => {
    try {
        //save today date and pass to mongo db for filter
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const incompleteTodos = await TodoModel.find({ completed: false, date: { $lt: today } })
            .sort({ date: -1 })
            .exec();

        res.json(incompleteTodos);
    } catch (error) {
        logger.error('Error retrieving incomplete todos:', error);
        res.status(500).json({ error: 'Internal Server Error: Incomplete did not respond' });
    }
};

// mark a todo as complete tick

export async function markComplete (req: Request, res: Response) {
    // pass to do id from frontend
    const todoId = req.params.id;
  
    try {
      // Finding the todo by ID in mongo db
      const todo = await TodoModel.findById(todoId);
  
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      todo.completed = true;
      await todo.save();

      return res.json({ message: 'Todo marked as complete', todo });
    } catch (error) {
        logger.error('Error marking todo as complete:', error);
      return res.status(500).json({ error: 'Internal Server Error: markComplete did not respond' });
    }
  }

  export const PastWeektodo = async (req: Request, res: Response) => {
    try {
        // Calculate the date 7 days ago
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

        const pastWeekData: Todo[] = await TodoModel.find({
            date: { $gte: sevenDaysAgo, $lte: today }
        })
        .sort({ date: -1 })
        .exec();

        res.json(pastWeekData);
    } catch (error) {
        logger.error('Error filtering past week data:', error);
        res.status(500).json({ error: 'Internal Server Error: PastWeektodo did not respond' });
    }
};