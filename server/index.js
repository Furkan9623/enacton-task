const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectToDataBase = require("./configs/db");
const {
  createError,
  errorHandler,
} = require("./middleware/error-handler-middleware.js");
const user_router = require("./routers/users-router");
const fileUpload = require("express-fileupload");
const app = express();

// middleWare
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
// all routers
app.get("/", (req, res) => res.send(`<h1>Application ready to run</h1>`));
app.use("/api/v1/user", user_router);
app.use("*", (req, res, next) =>
  next(
    createError(
      `${req.originalUrl} this url doesn't exist`,
      400,
      "global error"
    )
  )
);
app.use(errorHandler);
const port = process.env.SERVER_PORT;
const server = app.listen(port, () =>
  console.log(`SERVER RUN ON PORT ${port}`)
);
connectToDataBase().catch((er) =>
  console.log(`Error While Data Base Connect ${er}`)
);
server.on("listening", () => console.log("SERVER CONNECTE SUCCESSFULL..."));
server.on("error", (er) => console.log(er));
