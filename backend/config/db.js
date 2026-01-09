import mongoose from "mongoose";

let isConnected = false;

const connectMongoDB = async() => {
      if(isConnected) {
            return
        }
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
              dbName: "task-tracker"
        })
         isConnected = true
        console.log('MongoDB Atlas Database Connected Successfully');
    } catch (error) {
        console.log("Error Connecting Database" , error);
        throw error
    }
}

export default connectMongoDB