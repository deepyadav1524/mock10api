const express=require('express');
const bcrypt=require('bcrypt');
const UserModel=require("../model/user.model")
const jwt = require("jsonwebtoken");

const app = express.Router();

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.find({ email: email });
      console.log(user);
      const hashed_pass=user[0].password
      if (user.length > 0) {
        bcrypt.compare(password, hashed_pass, (err, result) => {
          // result == true
          if (result) {
            const token = jwt.sign({ userID: user[0]._id }, process.env.JWT_SECRET_KEY);
            res.send({ msg: "login sucessfull", token: token });
            res.status(201);
          } else {
            res.send(" wrong Crendnitial");
          }
        });
      } else {
        res.send(" wrong Crendnitial");
      }
    } catch (err) {
      console.log(err);
      res.send("something went wrong");
    }
  });


app.post("/register", async (req, res) => {
    const { name,email, password } = req.body;
  
    try {
      bcrypt.hash(password, 5, async (err, secure_password) => {
        if (err) {
          console.log(err);
        } else {
            
          const user = new UserModel({ email, password: secure_password, name});
          await user.save();
          res.send("Register");
          res.status(201);
        }
      });
    } catch (err) {
      res.send("eror");
      console.log(err);
    }
  });
  module.exports = app;