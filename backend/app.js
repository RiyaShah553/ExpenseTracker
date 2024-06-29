const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRoute');
const transactionRouter = require('./routes/transactionRouter');
const URL = 'mongodb+srv://shahriya553:MongoMongo@cluster0.kuafdws.mongodb.net/mern-expense?retryWrites=true&w=majority&appName=Cluster0';
require('dotenv').config()
const app = express();


// ! Connect to mongoDB
mongoose
    .connect(URL)
    .then(() => { console.log('DB Connected'); })
    .catch((e) => { console.log(e); })

// ! cors configuration
const corsOptions = {
    origin: ['https://expense-tracker-frontend-eight.vercel.app'],
    method:["POST","GET"],
    credentials:true
}
app.use(cors(corsOptions));
app.get('/',(req,res)=>{
res.json('hello');
})
// ! Middlewares
// pass incoming json data
app.use(express.json());
//! routes
app.use('/', userRouter);

app.use('/', categoryRouter);

app.use('/', transactionRouter);
// ! error handling middleware
app.use(errorHandler);
// ! start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
