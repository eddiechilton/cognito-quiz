<template>
  <div>
    <div v-if="(loadingAttempt || loadingQuiz)">
      attempt loading
    </div>
    <div v-if="(!loadingAttempt && !loadingQuiz)">
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
  <div v-if="(!loadingAttempt && !loadingQuiz) && attemptData.finished">
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
      loadingQuiz: true,
      loadingAttempt: true,
      attemptData: undefined,
      quizData: undefined
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
    async getQuiz(quizId) {
      const data = await fetch(`http://localhost:3000/quiz/${quizId}`);
      return data.json()
    },
    async getAttempt(attemptHash) {
      const data = await fetch(`http://localhost:3000/attempt/${attemptHash}`);
      return data.json()
    }
  },
  async mounted() {
    this.quizData = await this.getQuiz("1");
    this.loadingQuiz = false;
    this.attemptData = await this.getAttempt("asdf");
    this.loadingAttempt = false

  }
}

</script>
