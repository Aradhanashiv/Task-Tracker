import {model, Schema} from 'mongoose'

const taskSchema = new Schema({
    title: {
       type:String,
       required: [true, "Task title is required"],
       trim:true 
    },
    description: {
        type:String,
    },
    priority: {
        type:String,
        enum: ['Low','Medium','High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
          required: [true, "Due date is required"]
    },
    status: {
        type:String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    }
}, {timestamps: true})

const Task = model('Task', taskSchema)

export default Task