const express= require('express');
const cors= require('cors');
let connectdb = require('./config/db.js');
const operation=require('./route/operation.js');

require('dotenv').config();

connectdb();



const app=express();
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:5174',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.use('/operation',operation);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});