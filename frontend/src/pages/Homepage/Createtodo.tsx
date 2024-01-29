import React, { useState } from 'react';
import { Todo } from '../types'; // Import the Todo type
import { createTodo } from '../../utility/apiService'; // Import the createTodo API function

const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse the date string into a Date object
    const parsedDate = new Date(dateInput);

    // Create a todo object with the form data, including the parsed date
    const todoData: Todo = {
        id:10,
      title,
      description,
      completed: false,
      date: parsedDate,
    };

    try {
      // Call the createTodo API function with the todoData
      const response = await createTodo(todoData);
      console.log('Todo created:', response);
      
      // Clear the form fields after successful creation
      setTitle('');
      setDescription('');
      setDateInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        </div>
        <button type="submit">Create Todo</button>
      </form>
    </div>
  );
};

export default CreateTodo;
