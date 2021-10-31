const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const Student = require("../models/Student");

// @desc      Get all Students
// @route     GET /students
exports.getStudents = asyncHandler(async (req, res, next) => {
  const students = await Student.find().sort('-createdAt');

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// @desc      Get single Student
// @route     GET /students/:id
exports.getStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// @desc      Create Student
// @route     POST /students
exports.createStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.create(req.body);

  if (!student) {
    return next(new ErrorResponse(`Student not created`));
  }
  res.status(201).json({
    success: true,
    data: student,
  });
});

// @desc      Update Student
// @route     PUT /students/:id
exports.updateStudent = asyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    return next(
      new ErrorResponse(`Student not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// @desc      Delete Student
// @route     DELETE /students/:id
exports.deleteStudent = asyncHandler(async (req, res, next) => {
  await Student.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
