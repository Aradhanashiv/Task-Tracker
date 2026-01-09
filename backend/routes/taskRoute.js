import express from 'express'
import {handleCreateTask, handleGetAllTasks, handleUpdateTask, handleDeleteTask} from '../controllers/taskController.js'
const route = express.Router()

route.post('/create-task' , handleCreateTask)
route.get('/get-all-tasks' , handleGetAllTasks)
route.put('/update-task/:id' , handleUpdateTask)
route.delete('/delete-task/:id' , handleDeleteTask)

export default route