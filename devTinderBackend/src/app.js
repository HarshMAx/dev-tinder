const express = require('express');

const app = express();

app.use('/',(req,res)=>{
    res.send("Hello from server");
})

app.use('/home',(req,res)=>{
    res.send("this is home")
})
const PORT = 7777;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})