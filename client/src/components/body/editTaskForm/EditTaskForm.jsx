import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './EditTaskForm.css';

const EditTaskForm = ({ task, onTaskUpdated, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...task, title, description, status };
      const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}`, updatedTask);
      onTaskUpdated(response.data);
    } catch (error) {
      console.error(`Error al actualizar la tarea: ${error.message}`);
    }
  };

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
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
      <button type="submit">Actualizar Tarea</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

EditTaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  onTaskUpdated: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTaskForm;