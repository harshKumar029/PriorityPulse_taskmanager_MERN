import { Router } from 'express';
import * as todoController from '../controller/todo.controller';
import { Request, Response } from 'express';

const router = Router();

router.get('/', todoController.getAllTodos);

router.post('/', todoController.createTodo);

router.delete('/:id', todoController.deleteTodo);

router.get('/completed', todoController.CompletedTodo);

router.get('/incomplete', todoController.IncompleteTodo);

router.put('/:id/complete', todoController.markComplete);

router.get('/past-week', todoController.PastWeektodo);

router.post('/test', async (req: Request, res: Response) => {
    try {
      // Your code here
      res.send({ message: 'Test API endpoint is working!' });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;
