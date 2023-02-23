const express=require('express');
const connection=require("./config/db");
const userRouter=require("./routes/user.routes");
const flightRouter=require("./routes/flight.routes")
const authetication=require("./middleware/authenticate")
require("dotenv").config();

const cors=require("cors");
const app = express();
app.use(cors({
    origin:"*",
}))

app.use(express.json());
app.use("/api",userRouter)
app.use("/api",flightRouter)
app.listen(process.env.Port,async()=>{
try{
    await connection;
    console.log("connection established");
}catch(err){
    res.send("something went wrong");
    console.log(err);
}
console.log(`listening on ${process.env.Port}`);
})