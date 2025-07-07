import express = require('express');
import { errorHandler } from './middleware/errorHandler';
import { connectDb } from './config/dbConnection';

import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT || 3000;

connectDb();
const app = express();
app.use(express.json());

app.use('/api/contacts', require('./routes/contact.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is listening at port ${PORT}`);
});
