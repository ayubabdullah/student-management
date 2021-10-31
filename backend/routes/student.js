const express = require("express");
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student");

const Student = require("../models/Student");

const router = express.Router();

router.route("/").get(getStudents).post(createStudent);

router.route("/:id").put(updateStudent).delete(deleteStudent);

module.exports = router;
