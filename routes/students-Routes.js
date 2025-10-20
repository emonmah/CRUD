const express = require('express');
const { getStudents, getId, createStudent, updateStudent, deleteStudent } = require('../controller/studentController');


const router = express.Router();
//get all students list
router.get('/list', getStudents)
//get student by id
router.get('/get/:id',getId)

//Create new students
router.post('/create', createStudent)

//update student by id
router.put('/update/:id', updateStudent)

//delete student by id

router.delete('/delete/:id', deleteStudent)
module.exports = router;