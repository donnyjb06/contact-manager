import express = require("express")
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use('/api/contacts', require("./routes/contact.routes"))

app.listen(3000, () => {
  console.log(`Server is listening at port ${PORT}`);
});
