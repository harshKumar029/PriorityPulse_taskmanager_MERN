import React, { useState } from 'react';
import { Todo } from '../pages/types'; // Import the Todo type
import { createTodo } from '../utility/apiService'; // Import the createTodo API function

interface CreateTodoProps {
  onDataUpdated: () => void; // Define onDataUpdated prop
}

const CreateTodo: React.FC <CreateTodoProps>= ({ onDataUpdated }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse the date string into a Date object
    const parsedDate = new Date(dateInput);

    // Create a todo object with the form data, including the parsed date
    const todoData: Todo = {
      id: 10,
      title,
      description,
      completed: false,
      date: parsedDate,
    };

    try {
      // Call the createTodo API function with the todoData
      const response = await createTodo(todoData);
      console.log('Todo created:', response);
      onDataUpdated();
      alert("Task created")
      setTitle('');
      setDescription('');
      setDateInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className='createtodoform'>
      <form className='createform' onSubmit={handleSubmit}>
        <section className='createsection1'>
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>End date</label>
            <input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
          </div>
        </section>
        <section className='createsection2'>
          <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={50} 
          />
          </div>
          <section className='createtodobutton'>
            <button type="submit">Create Task</button>
          </section>
        </section>
      </form>
    </div>
  );
};

export default CreateTodo;
