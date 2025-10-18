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
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getStudents,
}