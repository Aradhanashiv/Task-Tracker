import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { serverUrl } from "../App";
import { toast } from "react-toastify"


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`${serverUrl}/api/get-all-tasks`, {
          withCredentials: true,
        });
      //   console.log(result.data.tasks);
        setTasks(result.data.tasks);
      //   setLoading(false);
      } catch (error) {
        console.log(error.response?.data?.message || "Something Went Wrong");
        setLoading(false);
      }
    };
    fetchAllTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
   setLoading(true)
   setErr(null)
    try {
      const result = await axios.put(
        `${serverUrl}/api/update-task/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      )
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      )
      setLoading(false)
    } catch (error) {
      setErr(error.response?.data?.message)
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
   setLoading(true)
   setErr(null)
    try {
      const result = await axios.delete(`${serverUrl}/api/delete-task/${taskId}`, { withCredentials: true });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setLoading(false)
        toast.success("Task Delete Successfully", {autoClose: 3000})
    } catch (error) {
      // console.log("Something Went Wrong");
      setErr(error.response?.data?.message);
       setLoading(false)
    }
  };

  return (
    <>
      <NavBar />
      <section id="header bg-pink-100 w-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 m-5 ">
          {tasks.map((task) => (
            <div
              className="bg-pink-200 p-4 border-none rounded-lg relative"
              key={task.title}
            >
              <p className="text-center font-semibold m-4 text-2xl text-pink-900">
                {task.title}
              </p>
              <p className="text-center font-gray-400 mb-5">
                {task.description}
              </p>
              <div className="flex item-center mb-5">
                <p className="font-semibold px-3 text-pink-900">Status</p>
                <select
                  value={task.status}
                  className={` px-2 py-1 rounded-md outline-none bg-white border
             ${
               task.status === "Pending"
                 ? "border-yellow-500 text-yellow-700 bg-yellow-100 "
                 : "border-green-500 text-green-700 bg-green-100 "
             }`}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex item-center mb-5 ">
                <p className="font-semibold px-3 text-pink-900">
                  Task Priority
                </p>
                <p className="border border-pink-800 px-4 py-1 rounded-md outline-none bg-white text-pink-700 hover:bg-white ">
                  {task.priority}
                </p>
              </div>
              <div className="flex item-center">
                <p className="font-semibold px-3 text-pink-900">Due Date</p>
                <p className="border border-pink-800 px-4 py-1 rounded-md outline-none bg-white text-pink-700 hover:bg-white/50">
                  {task.dueDate.slice(0, 10)}
                </p>
              </div>

              <button
                className="bg-red-500 px-2 py-1 text-white outline-none border-none rounded-lg mt-5 hover:bg-white hover:text-red-700"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
