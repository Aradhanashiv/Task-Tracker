import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import CreateTask from './components/CreateTask'
import Home from './components/Home'
// export const serverUrl = "http://localhost:4000"


const App = () => {
  return (
    <>
     <ToastContainer />
    <Routes>
      <Route path='/create-task' element={<CreateTask/>}/>
       <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App