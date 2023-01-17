require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./database');
const userroutes = require('./routes/user')
const logroute = require('./routes/authe')

connect()

app.use(express.json())
app.use(cors())

app.use("/api/users",userroutes)
app.use("/api/authe",logroute)

const port = process.env.PORT || 5000;
app.listen(port,() => console.log("listening on port " + process.env.PORT));