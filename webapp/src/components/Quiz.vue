<template>
  <div>
    <div v-if="loadingAttempt == 'loading' && attemptData.finished == false">
      attempt loading
    </div>
    <div v-if="loadingAttempt == 'complete' && attemptData.finished == false">
      <div class="metadata">
        <h1>Quiz: {{ quizData.metadata.quizName }}</h1>
        <h2>Author: {{ quizData.metadata.quizAuthor }}</h2>
        <h2>Instructor: {{ quizData.metadata.quizInstructor }}</h2>
        <h2>Current Question:{{ currentQuestion }}/{{ quizData.questions.length }}</h2>
      </div>
      <div class="current-question" v-for="question in quizData.questions" v-bind:key="question"
        v-show="currentQuestion == question.number">
        <h3>{{ question.header }}</h3>
        <h3>{{ question.body }}</h3>
        <button v-for="answer in question.answers" v-bind:key="answer" @click="markAnswer(answer)">{{ answer }} </button>
      </div>
      <div>
        backend data: {{ attemptData }}
      </div>
    </div>
  <div v-if="loadingAttempt == 'complete' && attemptData.finished == true">
    you have already completed this quiz
  </div>
  </div>
</template>

<style scoped></style>

<script>

export default {
  data() {
    return {
      currentQuestion: 1,
      loadingAttempt: "loading",
      attemptData: {
        attemptHash: "asdfasdfasdf",
        attemptName: "eddie",
        lastCompleted: 0,
        completedAnswers: [],
        finished: false
      },
      quizData: {
        metadata: {
          quizName: "Math quiz 1",
          quizAuthor: "John Doe",
          quizInstructor: "Jane Doe",
        },
        questions: [
          { number: 1, header: "Add two numbers", body: "x = 2 + 3", answers: ["1", "4", "5", "17"] },
          { number: 2, header: "Subract two numbers", body: "y = 10 - 3", answers: ["2", "3", "0", "7"] },
        ]
      }
    }
  },
  methods: {
    markAnswer(answer) {
      this.attemptData.completedAnswers[this.currentQuestion-1] = answer;
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.currentQuestion == 0) {
        //create hash
        this.currentQuestion++;
        return;
      } else if (this.currentQuestion >= this.quizData.questions.length) {
        this.attemptData.finished = true;
        return;
      } else {
        this.currentQuestion++;
        return;
      }
    },
    getAttempt(attemptHash) {
      //call api to get attempt data
      setTimeout(() => {this.loadingAttempt = "complete"}, 1000);
    }
  },
  mounted() {
    this.getAttempt("asdfasdfasdf");
  }
}

</script>
