import express from 'express';
import { getTaskById,getTasks, createTask, updateTask, deleteTask } from '../controllers/taskcontroller.js';
import authMiddleware from '../middleware/auth.js';


const taskRouter= express.Router();

taskRouter.route('/gp')
    .get(authMiddleware, getTasks)
    .post(authMiddleware, createTask);

    taskRouter.route('/:id/gp')
    .get(authMiddleware, getTaskById)
    .put(authMiddleware, updateTask)
    .delete(authMiddleware, deleteTask);

export default taskRouter;

