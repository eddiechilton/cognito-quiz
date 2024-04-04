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
    attempt => attempt.attemptHash.toString() == req.params.attemptHash.toString()
  );
  console.log("get attempt",attemptData)
  res.send(attemptData);
});

app.post("/attempt", (req, res) => {
  const newAttemptData = {
    attemptHash: "newhash",
    completedAnswers: [req.body.answer],
    finished: false,
  }
  fakeDb.attemptData.push(newAttemptData);
  console.log("poist attempt",JSON.stringify(newAttemptData))

  res.send(JSON.stringify(newAttemptData));
});

app.put("/attempt", (req, res) => {
  console.log(req.body)
  const attemptIndex = fakeDb.attemptData.findIndex(
    attempt => attempt.attemptHash.toString() == req.body.attemptHash.toString()
  );
  fakeDb.attemptData[attemptIndex].completedAnswers.push(req.body.answer);
  console.log("put attempt",JSON.stringify(fakeDb.attemptData[attemptIndex]))
  res.send(JSON.stringify(fakeDb.attemptData[attemptIndex]));
});

app.listen(3000, () => console.log("listening on port 3000."));
