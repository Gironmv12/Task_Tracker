import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './TaskForm.css';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, status };
      const response = await axios.post('http://localhost:3000/api/tasks', newTask);
      onTaskAdded(response.data);
      setTitle('');
      setDescription('');
      setStatus('pending');
    } catch (error) {
      console.error(`Error al crear la tarea: ${error.message}`);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Estado:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pendiente</option>
          <option value="in-progress">En Progreso</option>
          <option value="done">Terminado</option>
        </select>
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default TaskForm;