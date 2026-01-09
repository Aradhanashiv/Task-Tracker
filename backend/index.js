import 'dotenv/config'
import express from 'express'
import taskRoute from './routes/taskRoute.js'
import connectMongoDB from './config/db.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4001

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use('/api', taskRoute)
 
connectMongoDB()

app.listen(port, ()=>{
    console.log(`Server Started at ${port}`);
})

