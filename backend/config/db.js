import mongoose from "mongoose";

const connectMongoDB = async() => {
    try {
        const connectMongoDB = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Mongodb Atlas Connected -" ,mongoose.connection.host);
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB