const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./routes");
const ServerConfig = require("./config/server.config");
const errorHandler = require("./utils/errorHandler");
const connectToDB = require("./config/db.config");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);
app.use(errorHandler);
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server listening on ${ServerConfig.PORT}`);
  await connectToDB();
  console.log("connected to db");
});
