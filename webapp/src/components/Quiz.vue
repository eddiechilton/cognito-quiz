<template>
  <div>
    <div class="metadata">
      <h1>{{ quizData.metadata.quizName }}</h1>
      <h2>{{ quizData.metadata.quizAuthor }}</h2>
      <h2>{{ quizData.metadata.quizInstructor }}</h2>
    </div>
    <div class="current-question" v-for="question in quizData.questions" v-bind:key="question">
      <h3>{{ question.header }}</h3>
      <h3>{{ question.body }}</h3>
      <h3 v-for="answer in question.answers" v-bind:key="answer">{{ answer }}</h3>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      quizData: {
        metadata: {
          quizName: "Math quiz 1",
          quizAuthor: "John Doe",
          quizInstructor: "Jane Doe",
        },
        questions: [
          { header: "Question 1", body: "What is x?", answers: ["1", "#", "5", "17"] },
          { header: "Question 1", body: "What is y?", answers: ["2", "3", "0", "7"] },
        ]
      }
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>
