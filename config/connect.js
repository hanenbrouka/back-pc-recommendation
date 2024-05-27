const mongoose = require("mongoose");


mongoose  
  .connect("mongodb://localhost:27017/my_data_base", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db not connected");
  });

  module.exports=mongoose;