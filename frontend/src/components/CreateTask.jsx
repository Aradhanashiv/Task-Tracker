import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import { toast } from "react-toastify"
import { FaBackward } from "react-icons/fa";
import axios from 'axios'
import { serverUrl } from "../App"
import { useNavigate } from 'react-router-dom'

const CreateTask = () => {
       
  const priorityData = ['Low','Medium','High']
  const statusData = ['Pending', 'Completed']

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("")
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  
 const navigate = useNavigate()
 const handleCreateTask = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const payload = {title,description,priority,dueDate: date, status};
    const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create-task`, payload, { withCredentials: true });
    setTitle(""); 
    setDescription(""); 
    setPriority(""); 
    setDate(""); 
    setStatus("");
    setErr("");
    console.log(result.data);
     toast.success("Task Created Successfully", {autoClose: 3000})
    setLoading(false);
    navigate('/')
  } catch (error) {
    console.log(error);
    setErr(error.response?.data?.message || "Something went wrong");
    setLoading(false);
  }
};
  return (
    <div className="w-full min-h-screen bg-pink-50">
     <div className="p-6">
     <button onClick={()=>navigate('/')}><FaBackward size={25} /></button>
    </div>
       <div className='flex items-center justify-center'>
      <div className={`w-[90%] md:w-[50%] bg-white rounded-xl shadow-lg p-8 border-[1px] border-pink-600`} >
         <h1 className={`text-4xl font-bold text-pink-500 mb-2 text-center`}>Task Tracker</h1>
          <p className='text-center mt-3 font-semibold mb-6 text-gray-700'>Create New Task</p>
             {err && <p className="text-red-500 text-center font-semibold">*{err}</p>}   
             <form onSubmit={handleCreateTask}>

            <div className='mb-3'>  
            <label htmlFor="productName" className='block text-gray-700 font-medium mb-1'>Title</label>
            <input type='text' className='w-full border border-pink-600 rounded-lg px-3 py-2 outline-none' name='title' 
            placeholder='Enter Task Title' required  value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
               
            <div className='mb-3'>  
            <label htmlFor="description" className='block text-gray-700 font-medium mb-1'>Description</label>
            <input type='text' className='w-full border border-pink-600 rounded-lg px-3 py-2 outline-none' name='description' 
            placeholder='Enter Description'  value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>

             <div className='mb-3'>  
            <label htmlFor="priority" className='block text-gray-700 font-medium mb-1'>Priority</label>
             <select value={priority} onChange={(e)=>setPriority(e.target.value)} required
              className="w-full border border-pink-600 rounded-lg px-3 py-2 outline-none">
              <option value="">Select priority</option>
             {priorityData.map((priority => (
              <option key={priority} value={priority}>{priority}</option>
             )))} 
             </select>
             </div>
            

            <div className='mb-3'>  
            <label htmlFor="date" className='block text-gray-700 font-medium mb-1'>Due Date</label>
            <input type='date' className='w-full border border-pink-600 rounded-lg px-3 py-2 outline-none' name='date' 
            placeholder='Enter Due Date' required  value={date} onChange={(e)=>setDate(e.target.value)}/>
            </div>

       
            <div className='mb-3'>  
            <label htmlFor="status" className='block text-gray-700 font-medium mb-1'>status</label>
             <select value={status} onChange={(e)=>setStatus(e.target.value)} required
              className="w-full border border-pink-600 rounded-lg px-3 py-2 outline-none">
              <option value="">Select status</option>
             {statusData.map((status => (
              <option key={status} value={status}>{status}</option>
             )))} 
             </select>
             </div>

           <button type='submit'
            className='mt-4 w-full font-semibold rounded-xl px-6 py-2 text-white bg-pink-700 border border-pink-600 rounded-xl transition duration-200 hover: hover:text-gray-800  
            hover:bg-white cursor-pointer' disabled={loading}>
             {loading ? <ClipLoader size={20} />: "Create Task" }
            </button>
         </form>
      </div>
    </div>
    </div>
   
  )
}

export default CreateTask