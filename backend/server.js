const express = require("express");
const app = express();
var fakeDb = require('./fakeDb')

console.log(fakeDb)

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/quiz/:quizId", (req, res) => {
  const quizData = fakeDb.quizData.find(({ quizId }) => quizId == req.params.quizId);
  const { correctAnswers, ...quizDataMinusAnswers } = quizData;
  res.send(quizDataMinusAnswers);
});

app.listen(3000, () => console.log("listening on port 3000."));
