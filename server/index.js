import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import connectToMongo from "./db.js";
import auth from "./routes/auth.js";
import chat from "./routes/chat.js";
import user from "./routes/user.js"

const app = express();
const server = http.createServer(app);
const port = 3001;
app.use(cors());
const io = new Server(server,{
  cors:{origin:"*"}
});
app.use(express.json());   

try {
  //connection to db
  await connectToMongo();
  
  //routes
  app.use("/auth", auth);
  app.use("/chat", chat);
  app.use("/user", user);

  //socket io -->todo
  io.on('connection', (socket) => {
    console.log('A user connected.');
    socket.on("join-room",roomId=>{
      socket.join(roomId)
      console.log("connected to : ",roomId)
    })
    socket.on("sendMessages", () => {
      io.emit("getMessages");
    });
    socket.on("isTyping", (room) => {
      socket.to(room).emit("typing_message");
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    });
  });


  server.listen(port, () => {
    console.log("listening on *:3001",);
  });
} catch (error) {
  console.log(error);
}
