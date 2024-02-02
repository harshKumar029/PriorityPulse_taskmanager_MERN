import React, { useEffect, useState } from 'react';
import { Todo } from '../pages/types'; // Import the Todo type
import { getAllTodos } from '../utility/apiService';
import calender from '../assets/icon/calendar.svg';
import { Link } from 'react-router-dom';

const GetAllTodos: React.FC = () => {
  // State to store todo data
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getAllTodos();
        const todoDate = new Date(response[0].date).toLocaleDateString();
        const todayDate = new Date().toLocaleDateString();
        if(todoDate == todayDate){
        setTodos(response);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // todos.map((data: any) => {
  //   console.log("hjabfbabfbba",data);
  // });

  return (
    <div className='todaystodo'>
      <div className='t_taskheader'>
        <h2>Todays Task</h2>
        <Link to="/task">
          <button>View all</button>
        </Link>
      </div>
      <div className='todaytaskdata'>
        {todos.length > 0 ? (
          <div key={todos[0].id}>
            <h3>{todos[0].title}</h3>
            <p className='disc'>{todos[0].description}</p>
            <div className='calender'>
              <img src={calender} />
              <p>{new Date(todos[0].date).toLocaleDateString()}</p>
            </div>
          </div>
        )
          : <div className='nowork'>No work for today</div>

        }
      </div>
    </div>
  );
};



export default GetAllTodos;
