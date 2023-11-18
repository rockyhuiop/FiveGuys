const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv')
const connectDB = require("./config/db")


// DOTENV
dotenv.config()

// MONGODB CONNECTION
connectDB();


// REST Object
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

const PORT = process.env.PORT || 8080;



// ROUTES
app.use('/api/v1/auth', require("./routes/vdoRoutes"))

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgGreen.white)

});