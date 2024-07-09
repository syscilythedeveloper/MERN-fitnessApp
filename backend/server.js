require("dotenv").config();

//register express app
const express = require("express");
//get routes from workouts.js
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

//create express app
const app = express();

//set up middleware
app.use(express.json());
app.use((req, res, next) => {
  //path and method for each request
  console.log(req.path, req.method);
  next();
});

//route handler
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests on port 4000 after connected to db
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
