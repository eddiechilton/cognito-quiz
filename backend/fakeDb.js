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
        {
          number: 3,
          header: "multiply two numbers",
          body: "z = 10 * 3",
          answers: ["20", "30", "10", "70"],
        },
        {
          number: 4,
          header: "Divide two numbers",
          body: "a = 12 / 3",
          answers: ["2", "3", "4", "5"],
        },
      ],
      correctAnswers: ["5", "7", "30", "4"],
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
      correctAnswers: ["dog", "drive"],
    },
  ],
  attemptData: [
  ],
};

module.exports = fakeDb;
