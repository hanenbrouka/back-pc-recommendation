const express = require("express"); //importation express
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //importation db
const cors = require('cors');

// connect to  db
require("./config/connect");
// Middleware CORS pour autoriser les requêtes cross-origin


const app = express();

app.use(cors());
app.use(express.json()) 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // connection serveur

//
app.get("/", (req, res) => {
  res.send("Welcome");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admin',require("./Router/adminRouter"));
app.use("/api/user", require("./Router/authRouter"));
app.use("/api/profile", require("./Router/profilRouter"));