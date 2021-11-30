const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000; 
const http = require('http');
const httpServer = http.createServer(app)

//Require socket
const { Server } = require('socket.io')
const io = new Server(httpServer)

//Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

//Start Socket
io.on("connection", (socket) => {
  //Connected User
  console.log('User connected')
  
  //Welcome Message
  socket.emit("welcome"," Welcome")

  //Catch Message from client
  socket.on("sender", (arg) => {
     //Broadcast Message 
    io.emit("sender",arg);
  });
 
 //User Disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


});

//Listening Server
httpServer.listen(PORT,()=>{
	console.log('Server is Running On Port : ' + PORT)
})




