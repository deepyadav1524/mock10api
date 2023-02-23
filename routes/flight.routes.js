const express = require("express");
const flightRouter = express.Router();
const { FlightModel } = require("../model/flight.model");
const app = express.Router();
app.get("/flights", async (req, res) => {
  const query = req.query;
  const posts = await FlightModel.find(query);
  res.send(posts);
  res.status(201);
});

app.get("/flights/:id", async (req, res) => {
    const query = req.query;
    const id=req.params.id;
    const posts = await FlightModel.find({_id:id});
    res.send(posts);
    res.status(201);
  });
app.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const new_flight = new FlightModel(payload);
    await new_flight.save();
    res.send("New post created sucessfully");
  } catch (err) {
    console.log(err);
    res.send({ msg: "validation failded" });
  }
});

app.patch("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ msg: "Flight updated sucessfully" });
  } catch (err) {
    res.send({ msg: "Unable to update the flight" });
  }
});

app.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await FlightModel.findByIdAndDelete({ _id: id });
    res.send("Delete the  flight sucessfully");
  } catch (err) {
    res.send({ msg: "Unable to delete the flight(something went wrong" });
  }
});

module.exports = app;