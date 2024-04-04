const express = require("express");
const app = express();
const cors = require("cors");
var fakeDb = require('./fakeDb')


app.use(cors());

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/quiz/:quizId", (req, res) => {
  const quizData = fakeDb.quizData.find(({ quizId }) => quizId == req.params.quizId);
  const { correctAnswers, ...quizDataMinusAnswers } = quizData;
  res.send(quizDataMinusAnswers);
});

app.get("/attempt/:attemptHash", (req, res) => {
  const attemptData = fakeDb.attemptData.find(({ attemptHash }) => attemptHash == req.params.attemptHash);
  res.send(attemptData);
});

app.listen(3000, () => console.log("listening on port 3000."));
