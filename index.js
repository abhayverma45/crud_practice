// const connection=require("./connection");÷
const express=require("express");
const bodyparser=require("body-parser");
require("./model")
var userCntrl=require("./controller/usercontroller")


var app=express();
app.use(bodyparser.json())




app.get("/home",(req,res)=>{
    res.send("hello world");
})

app.get("/add",userCntrl.adduser)
app.get("/alluser",userCntrl.getusers)
app.get("/alluser/:id",userCntrl.getuser)
app.post("/postinguser",userCntrl.postuser)
app.delete("/alluser/:id",userCntrl.deleteuser)
app.patch("/alluser/:id",userCntrl.updateuser)
app.get("/finders",userCntrl.findersuser)
app.get("/getset",userCntrl.getsetuser)
app.get("/onetoone",userCntrl.getonetoone)

// app.get('/students',(req,res)=>{
//     connection.query('SELECT * FROM  student',(err,rows)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             // console.log(rows);
//             res.send(rows);
//         }
//     })
// })

// app.get('/students/:id',(req,res)=>{
// connection.query('SELECT * FROM  student WHERE id=?',[req.params.id],(err,rows)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             // console.log(rows);
//             res.send(rows);
//         }
//     })
// })

// app.delete('/students/:id',(req,res)=>{
//     connection.query('DELETE  FROM  student WHERE id=?',[req.params.id],(err,rows)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 // console.log(rows);
//                 res.send(rows);
//             }
//         })
//     })
//     app.post('/students',(req,res)=>{
//         var emp=req.body;
//         var empdata=[emp.id,emp.name]
//         connection.query('INSERT into student(id,name) values(?)',[empdata],(err,rows)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 // console.log(rows);
//                 res.send(rows);
//             }
//         })
//     })

//     app.patch('/students',(req,res)=>{
//         var emp=req.body;
      
//         connection.query('UPDATE student SET ? WHERE id='+emp.id,[emp],(err,rows)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 // console.log(rows);
//                 res.send(rows);
//             }
//         })
//     })
// User.sync({ force: true });
// Contact.sync({ force: true });

app.listen(3000,()=> console.log("our server is running on the port no : 3000"))