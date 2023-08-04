require('dotenv').config({ path: 'rt.env' });

const connectdb = require('./config/dbconfig.js');
const express = require('express');
const errorhandler = require("./middleware/erroehandler");

connectdb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", 
require("./routes/userRouter"));
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
