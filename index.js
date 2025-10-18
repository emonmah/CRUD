const express = require('express');
const mySqlPool = require('./config/db');
const app = express();
const port = 5001;

app.use('/api/v1/student', require('./routes/students-Routes'));

app.get('/test',(req, res)=>{
    res.send("hello");
})

mySqlPool.query('Select 1').then(()=>{
console.log('Database connected successfully')

    app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
}).catch((err)=>{
    console.error('Database connection failed:', err);
})

