import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3600;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database connection
connectDB();

// Routes
app.use('/api/user',userRouter);
app.use('/api/task', taskRouter);


//check if the server is running
app.get('/', (req, res) => {
  res.send('Hello World!....from backend,API WORKING');
}
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);
export default app;