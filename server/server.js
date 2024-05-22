require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { register} = require("./src/controllers/usuariosController");


const app = express();
const port = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;


mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database Connected');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.use(cors());
app.use(express.json());


app.post('/registro', register);


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});






















