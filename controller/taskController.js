const Task = require('../model/taskModel');

//obtener todas las tareas
const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);

    }catch(error){
        console.error(`Error al obtener las tareas: ${error.message}`);
        res.status(500).json({error: 'Error del servidor'});
    }
};

//obtener una tarea por su ID
const getTaskById  = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.json(task);

    }catch(error){
        console.error(`Error al obtener la tarea: ${error.message}`);
        res.status(500).json({error: 'Error del servidor'});
    }
};

//agregar una nueva tarea
const addTask = async (req, res) => {
    const task = new Task(req.body);
    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
        

    }catch(error){
        console.error(`Error al agregar la tarea: ${error.message}`);
        res.status(500).json({error: 'Error del servidor'});
    }
};

//actualizar una tarea existente
const updateTask = async (req, res) => {
    try{
        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body , {new: true});
        if(!updateTask){
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.json(updateTask);
    }catch(error){
        console.error(`Error al actualizar la tarea: ${error.message}`);
        res.status(500).json({error: 'Error del servidor'});
    }
};

//eliminar una tarea 
const deleteTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.json({message: 'Tarea eliminada correctamente'});
    }catch(error){
        console.error(`Error al eliminar la tarea: ${error.message}`);
        res.status(500).json({error: 'Error del servidor'});
    }
};

//marcar una tarea como en progreso
const taskInProgress = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        task.status = 'in-progress';
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//marcar una tarea como completada
const markTaskDone = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        task.status = 'done';
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    taskInProgress,
    markTaskDone
};