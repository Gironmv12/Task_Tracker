const express = require('express');
const router = express.Router();
const { getTasks, getTaskById, addTask, updateTask, deleteTask, taskInProgress, markTaskDone } = require("../controller/taskController");

// obtener todas las tareas
router.get('/', getTasks);

// obtener una tarea por su ID
router.get('/:id', getTaskById);

// agregar una nueva tarea
router.post('/', addTask);

// actualizar una tarea existente
router.put('/:id', updateTask);

// eliminar una tarea
router.delete('/:id', deleteTask);

// marcar una tarea como en progreso
router.patch('/:id/inprogress', taskInProgress);

// marcar una tarea como hecha
router.patch('/:id/done', markTaskDone);

module.exports = router;