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
        <h2>{{ this?.attemptData }} </h2>
      </div>
      <div class="current-question" v-for="question in quizData.questions" v-bind:key="question"
        v-show="currentQuestion == question.number">
        <h3>{{ question.header }}</h3>
        <h3>{{ question.body }}</h3>
        <button v-for="answer in question.answers" v-bind:key="answer" @click="markAnswer(answer)">{{ answer }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>

export default {
  data() {
    return {
      loadingQuiz: true,
      loadingAttempt: true,
      attemptData: undefined,
      quizData: undefined,
      finishedModal: false,
    }
  },
  computed: {
    currentQuestion() {
      if (this.attemptData?.completedAnswers) {
        return this.attemptData.completedAnswers.length + 1;
      } else {
        return 1;
      }
    }
  },
  methods: {
    async markAnswer(answer) {
      if (this.currentQuestion == 1) {
        await this.beginAttempt(answer);
        return;
      } else if (this.currentQuestion >= this.quizData.questions.length) {
        await this.updateAttempt(answer, this.attemptData.attemptHash)
        this.finishedModal = true;
        return;
      } else {
        await this.updateAttempt(answer, this.attemptData.attemptHash);
        await this.getAttempt(this.$route.params.attemptHash);
        return;
      }
    },
    async getQuiz(quizId) {
      console.log("quizId = ", quizId)
      const data = await fetch(`http://localhost:3000/quiz/${quizId}`);
      if (data) {
        return data.json()
      } else {
        return "eqwerqwer"
      }
    },
    async getAttempt(attemptHash) {
      const data = await fetch(`http://localhost:3000/attempt/${attemptHash}`);
      this.attemptData = await data.json();
    },
    async beginAttempt(answer) {
      const data = await fetch('http://localhost:3000/attempt/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answer
        })
      })
      this.attemptData = await data.json();
      this.$router.push(`/quiz/${this.quizData.quizId}/${this.attemptData.attemptHash}`)
    },
    async updateAttempt(answer, attemptHash) {
      const data = await fetch('http://localhost:3000/attempt/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          attemptHash,
          answer,
        })
      });
      this.attemptData = await data.json();
      this.$router.push(`/quiz/${this.quizData.quizId}/${this.attemptData.attemptHash}`)
    }
  },
  async mounted() {
    this.quizData = await this.getQuiz(this.$route.params.quizId);
    this.loadingQuiz = false;
    if (this.$route.params.attemptHash) {
      await this.getAttempt(this.$route.params.attemptHash);
    }
    this.loadingAttempt = false
  }
}

</script>
