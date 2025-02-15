import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/operation/todos');
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = { work: newTodo };
      try {
        const response = await fetch('http://localhost:3000/operation/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(todo),
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find((todo) => todo._id === id);
    const updatedTodo = { work: todoToToggle.work, completed: !todoToToggle.completed };

    try {
      const response = await fetch(`http://localhost:3000/operation/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      const updated = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updated : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/operation/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEditing = (id, text) => {
    setEditTodoId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    const updatedTodo = { work: editText };
    try {
      const response = await fetch(`http://localhost:3000/operation/todos/${editTodoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      const updated = await response.json();
      setTodos(
        todos.map((todo) => (todo._id === editTodoId ? updated : todo))
      );
      setEditTodoId(null);
      setEditText('');
    } catch (error) {
      console.error('Error saving todo edit:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="heading">To-Do List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          className="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
        />
        <button className="btn" type="submit">Add Todo</button>
      </form>

      <ul className="work">
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
            />
            {editTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                {todo.work}
                <button onClick={() => startEditing(todo._id, todo.work)}>
                  Edit
                </button>
              </>
            )}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
