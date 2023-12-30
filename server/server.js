import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbConfig.js'
import userRoute from './routes/userRouter.js'
import teacherRoute from './routes/teacherRouter.js'
import classRoute from './routes/classRouter.js'
const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/user',userRoute);
app.use('/api/teacher',teacherRoute)
app.use('/api/class',classRoute)

const port = process.env.PORT || 5500;




app.listen(port,()=>{
	connectDB();
	console.log(`Listening on port ${port}`)
})

