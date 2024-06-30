<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRoute");
const transactionRouter = require("./routes/transactionRouter");
=======
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRoute');
const transactionRouter = require('./routes/transactionRouter');
const URL = 'mongodb+srv://shahriya553:MongoMongo@cluster0.kuafdws.mongodb.net/mern-expenses?retryWrites=true&w=majority&appName=Cluster0';
require('dotenv').config()
>>>>>>> 15b805092457e2f42e976f2b755d5a4ddcea5621
const app = express();

//!Connect to mongodb
mongoose
    .connect("mongodb://localhost:27017/mern-expenses")
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
<<<<<<< HEAD
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//! Error
=======
    origin: ['https://expense-tracker-frontend-eight.vercel.app'],
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
>>>>>>> 15b805092457e2f42e976f2b755d5a4ddcea5621
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
<<<<<<< HEAD
app.listen(PORT, () =>
    console.log(`Server is running on this port... ${PORT} `)
);
=======
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
>>>>>>> 15b805092457e2f42e976f2b755d5a4ddcea5621
