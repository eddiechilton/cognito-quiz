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
      currentQuestion: 1,
      loadingQuiz: true,
      loadingAttempt: true,
      attemptHash: "hash",
      quizData: undefined,
    }
  },
  methods: {
    async markAnswer(answer) {
      if (this.currentQuestion == 1) {
        await this.beginAttempt(answer)
        this.currentQuestion++;
        return;
      } else if (this.currentQuestion >= this.quizData.questions.length) {
        await this.updateAttempt(answer, this.attemptHash)
        return;
      } else {
        await this.updateAttempt(answer, this.attemptHash)
        this.currentQuestion++;
        return;
      }
    },
    async getQuiz(quizId) {
      const data = await fetch(`http://localhost:3000/quiz/${quizId}`);
      if (data) {
        return data.json()
      } else {
        return "eqwerqwer"
      }
    },
    async getAttempt(attemptHash) {
      const data = await fetch(`http://localhost:3000/attempt/${attemptHash}`);
      if (data) {
        return data.json()
      } else {
        return "eqwerqwer"
      }
    },
    async beginAttempt(answer) {
      const beginAttemptSuccess = await fetch('http://localhost:3000/attempt/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answer
        })
      });
    },
    async updateAttempt(answer, attemptHash) {
      await fetch('http://localhost:3000/attempt/', {
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
    }
  },
  async mounted() {
    this.quizData = await this.getQuiz("1");
    this.loadingQuiz = false;
    this.loadingAttempt = false
  }
}

</script>
