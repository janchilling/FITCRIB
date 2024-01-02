const Workout = require("../models/workoutPlan.js");
const bodyParser = require("body-parser");
const router = require("express").Router();

// Create a New Workout plan
const createWorkoutPlan = async (req, res) => {
  const newWorkout = new Workout(req.body);

  newWorkout
    .save()
    .then(() => {
      res.json("Workout Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all created workouts by user id
const getWorkouts = (req, res) => {
  const userID = req.params.userID;

  Workout.find({ userID: userID })
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get a single workout by id
const singleWorkout = (req, res) => {
  const workoutId = req.params.id;

  Workout.findById(workoutId)
    .then((workout) => {
      if (!workout) {
        return res.status(404).json({ error: "No such workout" });
      }
      res.status(200).json(workout);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .json({ error: "Error with getting workout", message: err.message });
    });
};

//Delete a single workout plan
const deleteWorkout = async (req, res) => {
  const workoutId = req.params.id;

  await Workout.findByIdAndDelete(workoutId)
    .then(() => {
      res.status(200).send({ status: "Workout deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error deleting workout", error: err.message });
    });
};

//Update a workout plan
const updateWorkout = async (req, res) => {
  const { workoutName, workoutDescription, workoutPlan, workoutDuration } =
    req.body;
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout plan not found" });
    }

    workout.workoutName = workoutName;
    workout.workoutDescription = workoutDescription;
    workout.workoutPlan = workoutPlan;
    workout.workoutDuration = workoutDuration;

    const updatedWorkout = await workout.save();
    res.json(updatedWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Search a workout
const searchWorkout = async (req, res) => {
  let result = await Workout.find({
    $or: [{ workoutName: { $regex: req.params.key, $options: "i" } }],
  });
  res.json(result);
};

module.exports = {
  createWorkoutPlan,
  getWorkouts,
  singleWorkout,
  deleteWorkout,
  updateWorkout,
  searchWorkout,
};
