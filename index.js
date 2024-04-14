const express = require("express"); //importation express
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //importation db
// connect to  db
require("./config/connect");
//pore connection

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // connection serveur

//
app.get("/", (req, res) => {
  res.send("Welcome");
});
//get
// app.get("/Users", async (req,res) => {
// try{
//   await User.find({}).then((result)=>{
//     res.send(result);
//   });
// }
// catch (err) {
//   console.log(err);
// }
// });
//post
// app.post('/ajouter_user', async (req,res) => {
//   try{
//     let new_user=new user({
//       firstName:req.body.firstName,
//       lastName:req.body.lastName,
//       email:req.body.email,
//       password:req.body.password,
//       confirmPassword:req.body. confirmPassword,
//     });
//     await new_user.save();
//     res.send("save effectué avec succés!");
//   } catch(err) {
//     console.log(err);
//   }
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/user", require("./Router/authRouter"));
