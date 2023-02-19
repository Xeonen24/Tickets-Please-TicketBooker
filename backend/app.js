const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const errorHandler = require('./middleware/error');
const Routes = require('./routes/routes');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
    }));

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || origin === 'http://localhost:3000') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  
app.use("/api", Routes)


app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`);
})

