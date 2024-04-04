var fakeDb = {
    quizData: [
      {
          quizId: 1,
        metadata: {
          quizName: "Math quiz 1",
          quizAuthor: "John Doe",
          quizInstructor: "Jane Doe",
        },
        questions: [
          {
            number: 1,
            header: "Add two numbers",
            body: "x = 2 + 3",
            answers: ["1", "4", "5", "17"],
          },
          {
            number: 2,
            header: "Subract two numbers",
            body: "y = 10 - 3",
            answers: ["2", "3", "0", "7"],
          },
        ],
        correctAnswers: ["5","7"]
      },
      {
        quizId: 2,
        metadata: {
          quizName: "reading quiz 2",
          quizAuthor: "Janet Doe",
          quizInstructor: "James Doe",
        },
        questions: [
          {
            number: 1,
            header: "Nouns",
            body: "Which is a noun?",
            answers: ["frolicking", "dog", "it", "drive"],
          },
          {
            number: 2,
            header: "Verbs",
            body: "Which is a verb?",
            answers: ["frolicking", "dog", "it", "drive"],
          },
        ],
        correctAnswers: ["dog","drive"]
      },
    ],
    attemptData: [
      {
        attemptHash: "asdf",
        attemptName: "eddie",
        lastCompleted: 0,
        completedAnswers: [],
        finished: false,
      },
    ],
  };

  module.exports = fakeDb