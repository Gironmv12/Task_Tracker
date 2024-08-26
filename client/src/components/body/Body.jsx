import './Body.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './taskForm/TaskForm';
import EditTaskForm from './editTaskForm/EditTaskForm';

const Body = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(`Error al obtener las tareas: ${error.message}`);
      }
    };
    getTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      let response;
      if (newStatus === 'in-progress') {
        response = await axios.patch(`http://localhost:3000/api/tasks/${taskId}/in-progress`);
      } else if (newStatus === 'done') {
        response = await axios.patch(`http://localhost:3000/api/tasks/${taskId}/done`);
      }

      if (response && response.data) {
        const updatedTask = response.data;
        setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
      } else {
        console.error('La respuesta del servidor no contiene datos.');
      }
    } catch (error) {
      console.error(`Error al actualizar el estado de la tarea: ${error.message}`);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <div key={task._id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setEditingTask(task)}>Editar</button>
          {status === 'pending' && (
            <button onClick={() => handleStatusChange(task._id, 'in-progress')}>En Progreso</button>
          )}
          {status === 'in-progress' && (
            <button onClick={() => handleStatusChange(task._id, 'done')}>Terminado</button>
          )}
        </div>
      ));
  };

  return (
    <div className="body">
      <TaskForm onTaskAdded={handleTaskAdded} />
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onTaskUpdated={handleTaskUpdated}
          onCancel={handleCancelEdit}
        />
      )}
      <div className="task-section">
        <h2>Pendiente</h2>
        {renderTasks('pending')}
      </div>
      <div className="task-section">
        <h2>En Progreso</h2>
        {renderTasks('in-progress')}
      </div>
      <div className="task-section">
        <h2>Terminado</h2>
        {renderTasks('done')}
      </div>
    </div>
  );
};

export default Body;