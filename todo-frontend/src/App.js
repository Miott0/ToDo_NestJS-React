import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const API_URL = 'http://localhost:8000/todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const editRef = useRef(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setSelectedTodo(null);
        setEditedTodoText('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editRef]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const createTodo = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTodo }),
      });

      if (response.ok) {
        fetchTodos();
        setNewTodo('');
      } else {
        console.error('Failed to create todo. Status:', response.status);
      }
    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  async function updateTodo(todo) {
    const data = {
      name: editedTodoText,
      completed: todo.completed,
    };

    // Verifica se o texto editado é diferente do texto original
    if (editedTodoText !== todo.name) {
      try {
        const response = await fetch(`${API_URL}/${todo.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          fetchTodos();
          setSelectedTodo(null);
          setEditedTodoText('');
        } else {
          console.error('Failed to update todo. Status:', response.status);
        }
      } catch (error) {
        console.error('Error updating todo:', error.message);
      }
    } else {
      // Se o texto não foi alterado, apenas cancela a edição
      setSelectedTodo(null);
      setEditedTodoText('');
    }
  }

  const updateCompletionStatus = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      if (response.ok) {
        fetchTodos();
      } else {
        console.error('Failed to update completion status. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating completion status:', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTodos();
      } else {
        console.error('Failed to delete todo. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  return (
    <div className="container">
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <h1>Todo List</h1>
      <div className='input-container'>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={createTodo}>Add Task</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => updateCompletionStatus(todo.id, todo.completed)}
              />
            </div>
            {selectedTodo === todo ? (
              <div ref={editRef}>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button onClick={() => updateTodo(todo)}>Save</button>
              </div>
            ) : (
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => setSelectedTodo(todo)}
              >
                {todo.name}
              </span>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            {!selectedTodo && (
              <button onClick={() => setSelectedTodo(todo)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

