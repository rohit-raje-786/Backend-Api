const express = require("express");
const app = express();

const tasks = require("./routes/tasks");

const connectDB = require("./db/connect");

require("dotenv").config();

const notfFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/v1/tasks", tasks);
app.use(notfFound);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    let promise = await connectDB(process.env.MONGODB_URI);
    if (promise) {
      console.log("Succesfully connected to the DB");
    }

    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (e) {
    console.log(e);
  }
};

start();
