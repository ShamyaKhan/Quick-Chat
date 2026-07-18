require("dotenv").config();
const cors = require("cors");
const dns = require("dns");
const http = require("http");
const express = require("express");
const connectDB = require("./lib/db");
const { initSocket } = require("./lib/socket");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);

initSocket(server);

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

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
