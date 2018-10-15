const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const router = require('./router');

//DB Setup


//App Setup
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);


//Server Setup
const port = process.env.PORT || 4000;
app.listen(port,()=>{
  console.log(`Listening to ${port}`);
});