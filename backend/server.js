const express = require("express");
const app = express();
const cors = require("cors");
var fakeDb = require("./fakeDb");
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}
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
  res.send(attemptData);
});

app.post("/attempt", (req, res) => {
  const newHash = hash(Math.random()+req.body);
  const newAttemptData = {
    attemptHash: newHash,
    completedAnswers: [req.body.answer],
    finished: false,
    quizId: req.body.quizId
  }
  fakeDb.attemptData.push(newAttemptData);
  res.send(JSON.stringify(newAttemptData));
});

app.put("/attempt", (req, res) => {
  const attemptIndex = fakeDb.attemptData.findIndex(
    attempt => attempt.attemptHash.toString() == req.body.attemptHash.toString()
  );
  fakeDb.attemptData[attemptIndex].completedAnswers.push(req.body.answer);
  fakeDb.attemptData[attemptIndex].finished = req.body.finished;
  res.send(JSON.stringify(fakeDb.attemptData[attemptIndex]));
});

app.get("/score/:attemptHash", (req, res) => {
  const attemptIndex = fakeDb.attemptData.findIndex(
    attempt => attempt.attemptHash.toString() == req.params.attemptHash.toString()
  );
  const quizData = fakeDb.quizData.find(
    quiz => quiz.quizId == fakeDb.attemptData[attemptIndex].quizId
  );
  var resultsArray = fakeDb.attemptData[attemptIndex].completedAnswers.map((answer, index) => {
    const { number, header, body } = quizData.questions[index]
    const correctAnswer = quizData.correctAnswers[index]
    const selectedAnswer = answer
    const isCorrect = (answer == quizData.correctAnswers[index])
    return {
      questionNumber: number,
      instructions: header,
      questionText: body,
      correctAnswer,
      selectedAnswer,
      isCorrect
    }
  })
  fakeDb.attemptData[attemptIndex].results = resultsArray
  res.send(resultsArray);
});

app.listen(3000, () => console.log("listening on port 3000."));
