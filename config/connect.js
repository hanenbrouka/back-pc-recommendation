const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Laptops_scored_base", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Base de données connectée");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });


module.exports = mongoose;




