require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');


const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
 

const PORT = 7777;

connectDB().then(() => {
    console.log("Database Connection is Success");
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })

}).catch((err) => {
    console.error("Database not connest");

})