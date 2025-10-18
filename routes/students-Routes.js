const express = require('express');
const { getStudents } = require('../controller/studentController');


const router = express.Router();

router.get('/list', getStudents)
module.exports = router;