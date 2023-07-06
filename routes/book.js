const express = require("express");
const bookRouter = express.Router();
const bookmodel = require("../model/book");

bookRouter.post("/add", async (req, res) => {
  try {
    const data = new bookmodel(req.body);
    await data.save();
    res.status(400).send({ msg: "Book has been added successfully" });
  } catch (err) {
    res
      .status(400)
      .send("Unable to add the book at the moment...Please again!!");
  }
});

bookRouter.get("/", async (req, res) => {
  try {
    const data = await bookmodel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send("ERROR OCCURED");
  }
});

bookRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params.id;
  try {
    await bookmodel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Book has been deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .send("Unable to delete the book at the moment...Please again!!");
  }
});

bookRouter.get("/filter", async (req, res) => {
  try {
    const { genre } = req.body;
    const book = await bookmodel.find({ genre });
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send("ERROR OCCURED");
  }
});

bookRouter.get("/sort", async (req, res) => {
  try {
    const sort = {};
    sort[req.query.sortBy] = req.query.order;
    const book = await bookmodel.find().sort(sort);
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send("ERROR OCCURED");
  }
});

module.exports = { bookRouter };
