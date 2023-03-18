// by requiring dotenv it will allow credentials to use.
require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");
const DbConnect = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// running the express app
// if port avaiable in.env otherwise 5500
const PORT = process.env.PORT || 5500;
// enabling json middleware - for accepting json data from client
app.use(express.json({ limit: "8mb" }));
//enabling the cors middleware
const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOption));

DbConnect(); //connecting the database

//for serving storage static files on server
app.use('/storage', express.static('storage'));

// for this route '/'
app.get("/", (req, res) => {
  res.send("hello from the express");
});

app.use(router);

// app listening to the port
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
