// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Set a base URL for all axios requests
const API_BASE = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    getTodos();
  }, []); // The empty array means this effect runs once on component mount

  const getTodos = () => {
    axios.get(API_BASE)
      .then(res => setTodos(res.data))
      .catch(err => console.error("Error fetching todos: ", err));
  };

  const addTodo = async () => {
    if (newTodo) {
      const { data } = await axios.post(API_BASE, { text: newTodo });
      setTodos([...todos, data]);
      setNewTodo('');
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const completeTodo = async (id) => {
    const { data } = await axios.put(`${API_BASE}/complete/${id}`);
    setTodos(todos.map(todo => {
      if (todo._id === data._id) {
        todo.isCompleted = data.isCompleted;
      }
      return todo;
    }));
  };

  return (
    <div className="app">
      <h2>Add Tasks</h2>

      <div className="todo-form">
        <input
          type="text"
          onChange={e => setNewTodo(e.target.value)}
          value={newTodo}
          placeholder="Add a new task..."
        />
        <button onClick={addTodo}>Add Task</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div
            key={todo._id}
            className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={(e) => { e.stopPropagation(); deleteTodo(todo._id); }}>
              <span>❌</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;