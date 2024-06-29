const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRoute');
const transactionRouter = require('./routes/transactionRouter');
const URL = 'mongodb://localhost:27017/mern-expenses';
const app = express();


// ! Connect to mongoDB
mongoose
    .connect(URL)
    .then(() => { console.log('DB Connected'); })
    .catch((e) => { console.log(e); })

// ! cors configuration
const corsOptions = {
    origin: ['http://localhost:5173']
}
app.use(cors(corsOptions));

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