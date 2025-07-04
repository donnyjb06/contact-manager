const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server is listening at port ${PORT}`);
});
