import React, { useEffect, useState } from 'react';
import { Todo } from '../types'; // Import the Todo type
import { getAllTodos } from '../../utility/apiService'; // Import the getAllTodos API function

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
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>Title:</strong> {todo.title} | <strong>Description:</strong> {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default GetAllTodos;
