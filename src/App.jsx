import React, { useState } from 'react';
import './App.css';

const priorities = ['Low', 'Medium', 'High'];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('None');

  const [form, setForm] = useState({ title: '', description: '', priority: 'Low' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  //----------------------------------handle input--------------------------------------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //----------------------------------add task and edit the task---------------------------------------------
  const addTask = () => {
    if (!form.title || !form.description) {
      alert("Title and Description are required");
      return;
    }

    if (isEditing) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], ...form };
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newTask = { ...form, completed: false };
      setTasks([...tasks, newTask]);
    }

    setForm({ title: '', description: '', priority: 'Low' });
  };

  //-----------------------------------Delete task-----------------------------------
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };
  //---------------------------------for mark as complete----------------------------------------
  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };


  // -------------------------------for edit task------------------------------------
  const editTask = (index) => {
    setForm(tasks[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // ------------------------------for apply the filter-----------------------------
  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
  });



  // -----------------------------priorities(filter)---------------------------------------
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'LowToHigh') {
      return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
    } else if (sortOrder === 'HighToLow') {
      return priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
    }
    return 0;
  });

  return (
    <div className="app">
      <h1 >Dynamic Todo List</h1>

      <div className="form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <select name="priority" value={form.priority} onChange={handleChange}>
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button onClick={addTask}>{isEditing ? 'Update Task' : 'Add Task'}</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="None">Sort by Priority</option>
          <option value="LowToHigh">Low to High</option>
          <option value="HighToLow">High to Low</option>
        </select>
      </div>

      <ul className="task-list">
        {sortedTasks.map((task, index) => (
          <div className="task-box">
            <li key={index} className= {task.completed ? 'completed' : ''}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <div className="actions">
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
