// const connection=require("./connection");÷
const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const routeService=require("./routes/index")
const dotenv=require('dotenv')
dotenv.config()
const path=require('path')
// require("./model")

app.use(bodyparser.json())


const directory = path.join(__dirname, '/public/images');
app.use('/images', express.static(directory));

app.get("/home",(req,res)=>{
    res.send("hello world");
})

routeService(app);
const port=process.env.PORT
app.listen(port,()=> console.log(`our server is running on the port no : ${port}`))