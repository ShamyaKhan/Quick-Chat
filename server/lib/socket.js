const { Server } = require("socket.io");

// store online users
const userSocketMap = {};
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

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
}

module.exports = { initSocket, getIO: () => io, userSocketMap };
