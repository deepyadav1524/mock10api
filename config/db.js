require("dotenv").config();
let mongoose=require("mongoose");
mongoose.set("strictQuery",false)
let connection=mongoose.connect(process.env.Mongo_URL);
module.exports={connection};
