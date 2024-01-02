const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const Workout = require("../models/workoutPlan.js");

const {
  createWorkoutPlan,
  getWorkouts,
  singleWorkout,
  deleteWorkout,
  updateWorkout,
  searchWorkout,
} = require("../controllers/workoutPlanController");

// Add an Workout to the DB
router.post("/addWorkout", createWorkoutPlan);

// Get all workouts
router.get("/getWorkouts/:userID", getWorkouts);

// Get a single WorkoutPlan
router.get("/:id", singleWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Update a particular workout
router.put("/update/:id", updateWorkout);

// Search a workout
router.get("/search/:key", searchWorkout);

module.exports = router;
