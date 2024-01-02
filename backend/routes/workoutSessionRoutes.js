const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const session = require("../models/workoutSessions.js");

const {
  addSession,
  getSessions,
  getSessionDay,
  deleteSession,
  getSessionDetails,
} = require("../controllers/workoutSessionController");

// Create a session
router.post("/addSession", addSession);

// Get a session based on ID
router.get("/:id", getSessions);

// Get a session based on ID and day
router.get("/:id/:dayIndex", getSessionDay);

// Delete a session based on ID and day
router.delete("/:id/:dayIndex", deleteSession);

// Get session details
router.get("/:id/:sessionNumber/:dayIndex", getSessionDetails);

module.exports = router;
