import express from 'express';
const PORT = process.env.PORT || 5000;
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import authRoute from './routes/auth.js'
import userRoute  from './routes/users.js';

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();


const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connected to mongoDB")
        
    } catch (error) {
        throw(error)
        
    }
}

mongoose.connection.on("disconnected" , ()=>{
    console.log("mongodb disconnected")
})

mongoose.connection.on("connected" , ()=>{
    console.log("mongodb connected")
})

app.use("/api/auth", authRoute); 
app.use("/api/users",userRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});


app.listen(PORT, () => {
    connect();
    console.log(`Server running on port ${PORT}`);
});