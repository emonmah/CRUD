const mySqlPool = require("../config/db");

const getStudents = async (req, res) => {
    try{
        const [data] = await mySqlPool.query('select * from student')
        if(!data || data.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No students found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Students retrieved successfully',
            data:data
        })
            }
    catch(err){
        console.log('Error fetching students:', err);
        res.status(500).json({ 
            success:false,
            message:'Internal Server Error' });
    }
}

const getId = async(req, res) =>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(400).json({
                success:false,
                message:'Student Id in required'
            })
        }
        const [data] = await mySqlPool.query(`select * from student where id = ?`, [studentId]);
        if(!data){
            return res.status(400).json({
                success : false,
                message: 'Student not found with the given id'
            })
        }
        res.status(200).json({
            success:true,
            message:'Data factched successfully by id',
            studentDetails:data
        })
    } catch (error) {
        console.log('Error fatching by id', error);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
}

const createStudent = async(req, res)=>{
    try {
        const {name, fees, roll} = req.body;
        if(!name || !fees || !roll){
            return res.status(400).json({
                success:false,
                message:'Field is empty',
            })
        }
        const [data] = await mySqlPool.query('insert into student (name, fees, roll) values(?,?,?)',[name, fees, roll]);
        if(!data){
            return res.status(400).json({
                success:false,
                message:'Data not found'
            })
        }
        res.status(200).json({
            success:true,
            message:'New record created'
        })
    } catch (error) {
        console.log("Error Found", error);
        res.status(500).json({
            success:false,
            message:'Internal Server error',
            error
        })
    }
}

const updateStudent = async(req,res)=>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(400).json({
                success:false,
                message:'Student Id in required'
            })
        }
        const {name,fees,roll} = req.body;
        const [data] = await mySqlPool.query('update student set name = ?, fees=?,roll=? where id = ?',[name, fees, roll, studentId]);
        if(!data){
            return res.status(400).json({
                success:false,
                message:'Required all field'
            })
        }
        res.status(200).json({
            success:true,
            message:'Update the data'
        })
    } catch (error) {
        console.log("Error found", error);
        res.status(500).json({
            success:false,
            message:'Internal Server error',
            error
        })
    }
}


const deleteStudent = async(req, res)=>{
    try {
        const studentId = req.params.id;
        if(!studentId){
            return res.status(400).json({
                success:false,
                message:'Id required'
            })
        }
        const [data] = await mySqlPool.query('delete from student where id = ?',[studentId]);
        if(!data){
            return res.status(400).json({
                success:false,
            })
        }
        res.status(200).json({
            success:true,
            message:'Deleted successfully'
        })
    } catch (err) {
        console.log("Error found", err);
        res.status(500).json({
            success:false,
            message:'Internal server error',
            error: err.message
        })
        
    }
}

module.exports = {
    getStudents,
    getId,
    createStudent,
    updateStudent,
    deleteStudent
}