const express = require("express");
const socket = require("socket.io");
 const app = express();//initializing server
app.use(express.static("public"))

 let server = app.listen(3000,()=>{
    console.log("listening at port")
 });


 let io = socket(server) //connection bn jayega
 io.on("connection",(socket)=>{
    console.log("made socket connection")
    //received data
    socket.on("beginPath",(data)=>{
        //now transfer data to all connected computers
        io.sockets.emit("beginPath, data");
    })
    socket.on("drawStroke",(data)=>{
       io.sockets.emit("drawStroke",data);
    })
    socket.on("redoUndo",(data)=>{
        drawStroke(data);
    })
 })
