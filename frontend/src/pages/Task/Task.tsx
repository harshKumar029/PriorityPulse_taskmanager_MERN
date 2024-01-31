import React, { useState, useEffect } from 'react';
import { Incomplete, Completed, markComplete, deleteTodo, getAllTodos } from '../../utility/apiService';
import Navbar from '../../components/Navbar';
import Addsvg from '../../assets/icon/add.svg'
import Removesvg from '../../assets/icon/remove.svg'
import './task.css';

interface Todo {
  _id: string; 
  title: string;
  completed: boolean;
  date: string;
  description: string;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showheader, setheader] = useState<string>('');

  const handleMarkComplete = async (id: string) => {
    try {
      await markComplete(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error marking todo as complete:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const handleToggleinncom = async () => {
    try {
      const IncompleteTodos = await Incomplete();
      setTodos(IncompleteTodos);
      setheader('Past Incomplete Tasks');
    } catch (error) {
      console.error('Error fetching upcoming todos:', error);
    }
  };
  const handleTogglecomp = async () => {
    try {
      const getCompleted = await Completed();
      setTodos(getCompleted);
      setheader('Completed Tasks');
    } catch (error) {
      console.error('Error fetching upcoming todos:', error);
    }
  };

  const handleGetAllUpcomingTodos = async () => {
    try {
      const upcomingTodos = await getAllTodos();
      setTodos(upcomingTodos);
      setheader('Upcoming Scheduled Tasks');
    } catch (error) {
      console.error('Error fetching upcoming todos:', error);
    }
  };
  useEffect(() => {
    handleGetAllUpcomingTodos();
  }, []);

  return (
    <>
      <Navbar />
      <div className='taskpage'>
        <div className='taskwrapper'>
          <div className='taskbutton'>
            <button onClick={ handleToggleinncom}>Incomplete</button>
            <button onClick={ handleTogglecomp}>Complete</button>
            <button onClick={handleGetAllUpcomingTodos}>Upcoming Tasks</button>
            <h2>{showheader}</h2>
          </div>
          <div>
            <div className=''>
              {todos.map(todo => (
                <div key={todo._id}>
                  <section className='tasktital'>
                    <h3>{todo.title}</h3>
                    <p>{new Date(todo.date).toLocaleDateString()}</p>
                  </section>
                  <section className='taskdiscription'>
                  <p>{todo.description}</p>
                  <div>
                  {!todo.completed && 

                    <img src={Addsvg} style={{width:40}} onClick={() => handleMarkComplete(todo._id)} />
                    }
                  <img src={Removesvg} style={{width:40,marginLeft:15}} onClick={() => handleDeleteTodo(todo._id)} />
                  </div>
                  </section>
                  <hr />
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
