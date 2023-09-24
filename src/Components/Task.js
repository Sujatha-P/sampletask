import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://crudcrud.com/api/3223602faaa44ae5b70ae2b4a972d70e/unicorns');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

 

  const updateTask = async () => {
    if (!editedTask) return;
  
    try {
      const updatedTask = { ...selectedTask, name: editedTask };
      console.log('Updated Task:', updatedTask);
  
      await axios.put(`https://crudcrud.com/api/3223602faaa44ae5b70ae2b4a972d70e/unicorns/${selectedTask._id}`, updatedTask);
      console.log('Task updated successfully.');
  
      const updatedTasks = tasks.map((task) =>
        task._id === selectedTask._id ? updatedTask : task
      );
  
      setTasks(updatedTasks);
      setSelectedTask(null);
      setEditedTask('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://crudcrud.com/api/3223602faaa44ae5b70ae2b4a972d70e/unicorns/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setEditedTask(task.name);
  };

  const cancelEdit = () => {
    setSelectedTask(null);
    setEditedTask('');
  };

  return (
    <div className="App">
      <div>
        <table className='table table-hover table-border'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task._id}</td>
                <td>
                  {selectedTask === task ? (
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                  ) : (
                    task.name
                  )}
                </td>
                <td>
                  {selectedTask === task ? (
                    <>
                      <button onClick={updateTask}>Update</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className='btn btn-primary' onClick={() => editTask(task)}>Edit</button>
                      <button className="btn btn-danger ms-2" onClick={() => deleteTask(task._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Task;
