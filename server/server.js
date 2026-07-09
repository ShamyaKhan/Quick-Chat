require("dotenv").config();
const cors = require("cors");
const dns = require("dns");
const http = require("http");
const express = require("express");
const connectDB = require("./lib/db");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// initialize socket.io server
const io = new Server(server, {
  cors: { origin: "*" },
});

// store online users
const userSocketMap = {};

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected!", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("Server is Live!");
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();

module.exports = { io, userSocketMap };
