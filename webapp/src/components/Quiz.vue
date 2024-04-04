<template>
  <div>
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
      <button v-for="answer in question.answers" v-bind:key="answer" @click="nextQuestion()">{{ answer }} </button>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      currentQuestion: 1,
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
    nextQuestion() {
      if (this.currentQuestion == 0) {
        //create hash
        console.log('here')
        this.currentQuestion++;
        return;
      } else if (this.currentQuestion >= this.quizData.questions.length) {
        //end quiz
        return;
      } else {
        this.currentQuestion++;
        return;
      }
    }
  }
}
</script>
