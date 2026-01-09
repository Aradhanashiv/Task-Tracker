import Task from '../models/taskModel.js'
import taskModel from '../models/taskModel.js'

export const handleCreateTask = async (req,res) => {
    try {
        const {title, description, dueDate,priority,status} = req.body
        if(!title || !dueDate) {
          return res.status(400).json({success:false, message:'Please Fill Required fields'})
        }
        const isTaskExists = await taskModel.findOne({
            title: title.trim(),
            dueDate: new Date(dueDate)
        })
        if(isTaskExists){
         return res.status(409).json({success:false, message:'This Task is Already Exists'})  
        }
        const newTask = await taskModel.create({
            title,
            description,
            dueDate,
            priority,
            status
        })
       return res.status(201).json({success:true, message:'New Task Created Successfully'})  
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:'Internal Server Error'})   
    }
}

export const handleUpdateTask = async (req,res)=>{
    try {
        const {id} = req.params
        const {status} = req.body
         if(!id){
         return res.status(404).json({success:false, message:'TaskID is not valid'})
        }

        const allowedStatus = ["Pending", "Completed"];
        if (!status || !allowedStatus.includes(status)) {return res.status(400).json({ success: false, message: "Status must be Pending or Completed"})
         }
        const updatedTask = await taskModel.findByIdAndUpdate(id,{status}, { new:true, runValidators:true})
        if(!updatedTask){
        return res.status(404).json({success:false, message: "Task not Updated"})
        }
       return res.status(200).json({success:true, message:'Task Updated Successfully' ,data: updatedTask}) 
    } catch (error) {
         console.log(error);
       return res.status(500).json({success:false, message:'Internal Server Error'})   
    }  
}

export const handleGetAllTasks = async (req,res) => {
    try {
        const tasks = await taskModel.find().sort({createdAt: -1})
        if(tasks.length === 0){
          return res.status(200).json({ success: true, message: "No tasks found",Tasks: []});
        }
       return res.status(200).json({success:true, message:'Tasks Fetched Successfully' ,tasks: tasks})    
    } catch (error) {
       console.log(error);
       return res.status(500).json({success:false, message:'Internal Server Error'})   
    }  
}

export const handleDeleteTask = async (req,res) => {
    try {
        const {id} = req.params
        if(!id){
         return res.status(400).json({success:false, message:'TaskID is not valid'})
        }
        const deletedTask = await taskModel.findByIdAndDelete(id)
        if(!deletedTask){
        return res.status(404).json({success:false, message: "Task Not Found"})
        }
        return res.status(200).json({success:false, message:'Task Deleted successfully', data: deletedTask})
    } catch (error) {
       console.log(error);
       return res.status(500).json({success:false, message:'Internal Server Error'})   
    }  
}

