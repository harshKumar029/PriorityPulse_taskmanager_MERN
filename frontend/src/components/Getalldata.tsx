import React, { useEffect, useState } from 'react';
import { Todo } from '../pages/types'; // Import the Todo type
import { getAllTodos } from '../utility/apiService'; 

const GetAllTodos: React.FC = () => {
  // State to store todo data
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getAllTodos();
        setTodos(response);
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
    <div>
      <h2>All Todos</h2>
      <ul>
      { todos.length>0? (
      <li key={todos[0].id}>
        <strong>Title:</strong> {todos[0].title} | <strong>Description:</strong> {todos[0].description}
        | <strong>Date:</strong> {new Date(todos[0].date).toLocaleDateString()}
      </li>
    )
    :<li>no data</li>

   }
      </ul>
    </div>
  );
};



export default GetAllTodos;
