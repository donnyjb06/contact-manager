import express = require("express")
const { errorHandler } = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

connectDb()
const app = express();

app.use(express.json())
app.use('/api/contacts', require("./routes/contact.routes"))
app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Server is listening at port ${PORT}`);
});
