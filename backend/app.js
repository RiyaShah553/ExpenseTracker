const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRoute');
const transactionRouter = require('./routes/transactionRouter');
const URL = 'mongodb+srv://shahriya553:MongoMongo@cluster0.kuafdws.mongodb.net/mern-expenses?retryWrites=true&w=majority&appName=Cluster0';
require('dotenv').config()
const app = express();

//!Connect to mongodb
mongoose
    .connect("mongodb://localhost:27017/mern-expenses")
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);



// ! error handling middleware
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
