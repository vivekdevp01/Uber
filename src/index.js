const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const apiRouterFactory = require("./routes");
const cookieParser = require("cookie-parser");
const ServerConfig = require("./config/server.config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config");
const cors = require("cors");
const socketIo = require("socket.io");
const { redisClient, connectRedis } = require("./config/redis.config");
const LocationService = require("./services/location-service");
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://127.0.0.1:5500", // 👈 Explicitly allow your frontend origin
  credentials: true, // 👈 Required to allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // 👈 Allow necessary HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // 👈 Ensure headers are allowed
};
app.use(cors(corsOptions));
const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
console.log("[DEBUG] io instance created:", !!io);
// const apiRouter = apiRouterFactory;
const apiRouter = apiRouterFactory(io);
console.log("[DEBUG] apiRouter:", apiRouter);
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api", apiRouter);
app.use(errorHandler);
async function startServer() {
  try {
    await connectToDB();
    console.log("✅ Connected to MongoDB");

    await connectRedis(); // Ensures Redis connects only once

    server.listen(ServerConfig.PORT, () => {
      console.log(`🚀 Server listening on port ${ServerConfig.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1);
  }
}

startServer();

io.on("connection", (socket) => {
  console.log("Got connection");
  socket.on("registerDriver", async (driverId) => {
    await LocationService.setDriverSocket(driverId, socket.id);
    console.log("set driver socket");
  });
  socket.on("disconnect", async () => {
    const driverId = await LocationService.getDriverSocket(
      `driver:${socket.id}`
    );
    if (driverId) {
      await LocationService.delDriverSocket(`driver:${driverId}`);
    }
  });
});
// app.listen(ServerConfig.PORT, async () => {
//   console.log(`Server listening on ${ServerConfig.PORT}`);
//   await connectToDB();
//   console.log("connected to db");
// });

// redisClient.on("connect", () => {
//   console.log("Connected to Redis");
// });
