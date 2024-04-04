const express = require("express");
const app = express();
const cors = require("cors");
var fakeDb = require("./fakeDb");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/quiz/:quizId", (req, res) => {
  const quizData = fakeDb.quizData.find(
    ({ quizId }) => quizId == req.params.quizId
  );
  const { correctAnswers, ...quizDataMinusAnswers } = quizData;
  res.send(quizDataMinusAnswers);
});

app.get("/attempt/:attemptHash", (req, res) => {
  const attemptData = fakeDb.attemptData.find(
    attempt => attempt.attemptHash.toString() == req.body.attemptHash.toString()
  );
  res.send(attemptData);
});

app.post("/attempt", (req, res) => {
  const hash = "hash"
  fakeDb.attemptData.push({
    attemptHash: hash,
    completedAnswers: [req.body.answer],
    finished: false,
  });
  res.send(true);
});

app.put("/attempt", (req, res) => {
  const attemptIndex = fakeDb.attemptData.findIndex(
    attempt => attempt.attemptHash.toString() == req.body.attemptHash.toString()
  );
  fakeDb.attemptData[attemptIndex].completedAnswers.push(req.body.answer);
  console.log(fakeDb.attemptData)
  res.send(true);
});

app.listen(3000, () => console.log("listening on port 3000."));
