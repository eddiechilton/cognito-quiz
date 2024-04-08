<template>
  <div>
    <div v-if="(loadingAttempt || loadingQuiz)">
      attempt loading
    </div>
    <div v-if="(!loadingAttempt && !loadingQuiz)">
      <div class="metadata">
        <h1>{{ quizData.metadata.quizName }}</h1>
        <h1 v-if="!finishedModal">Question: {{ currentQuestion }}/{{ quizData.questions.length }}</h1>
      </div>

      <div class="current-question" v-for="question in quizData.questions" v-bind:key="question"
        v-show="currentQuestion == question.number">
        <h3 class="question-header">{{ question.header }}</h3>
        <h3 class="question-header">{{ question.body }}</h3>
        <form v-for="answer in question.answers" v-bind:key="answer">
          <input type="radio" v-model="chosenAnswer" :value="answer" :name="question" :id="answer">
          <label :for="answer" class="answer">{{ answer }}</label>
        </form>

        <button @click="markAnswer(chosenAnswer)" :disabled="!chosenAnswer">submit</button>
      </div>
    </div>
    <div v-if="finishedModal" class="mask">
      <div class="modal">
        Congrats, you've completed this quiz!
        <div v-if="attemptData?.results !== undefined">
          <h2 style="text-align: center">RESULTS:</h2>
          <table>
            <tr>
              <th>Question Number</th>
              <th>Instructions</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Your Answer</th>
              <th>Correct</th>
            </tr>
            <tr v-for="result in attemptData.results" v-bind:key="result">
              <td>{{ result.questionNumber }}</td>
              <td>{{ result.instructions }}</td>
              <td>{{ result.questionText }}</td>
              <td>{{ result.correctAnswer }}</td>
              <td>{{ result.selectedAnswer }}</td>
              <td>{{ result.isCorrect }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.question-header,
.current-question,
.answer {
  text-align: center;
}

.current-question {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

.answer {
  display: flex;
  padding: 10px 5px;
  background-color: #b8a0cb;
  margin: 10px;
  border-radius: 5%;
  justify-content: center;

}

input[type="radio"] {
  visibility: hidden;
  height: 0;
  width: 0;
}

input[type="radio"]:checked+label {
  background-color: #8d57b8;
}

th,
td,
tr {
  padding: 10px;
  text-align: center;
  opacity: 100%;

}

td:nth-child(even),
th:nth-child(even) {
  background-color: #b8a0cb;
}

.modal {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  background: whitesmoke;
  padding: 3%
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgb(101, 101, 143);
}
</style>

<script>

export default {
  data() {
    return {
      loadingQuiz: true,
      loadingAttempt: true,
      attemptData: undefined,
      quizData: undefined,
      chosenAnswer: undefined,
    }
  },
  computed: {
    currentQuestion() {
      if (this.attemptData?.completedAnswers) {
        return this.attemptData.completedAnswers.length + 1;
      } else {
        return 1;
      }
    },
    finishedModal() {
      if (this.attemptData?.finished) {
        return true;
      } else {
        return false
      }
    }
  },
  methods: {
    async markAnswer(answer) {
      if (this.currentQuestion == 1) {
        await this.beginAttempt(answer, this.quizData.quizId);
      } else if (this.currentQuestion >= this.quizData.questions.length) {
        await this.updateAttempt(answer, this.attemptData.attemptHash, true)
        await this.scoreQuiz(this.attemptData.attemptHash)
        await this.getAttempt(this.$route.params.attemptHash);
      } else {
        await this.updateAttempt(answer, this.attemptData.attemptHash, false);
        await this.getAttempt(this.$route.params.attemptHash);
      }
      this.chosenAnswer = undefined
    },
    async getQuiz(quizId) {
      const data = await fetch(`http://localhost:3000/quiz/${quizId}`);
      if (data) {
        return data.json()
      } else {
        return "eqwerqwer"
      }
    },
    async scoreQuiz(attemptHash) {
      const data = await fetch(`http://localhost:3000/score/${attemptHash}`);
    },
    async getAttempt(attemptHash) {
      const data = await fetch(`http://localhost:3000/attempt/${attemptHash}`);
      this.attemptData = await data.json();
    },
    async beginAttempt(answer, quizId) {
      const data = await fetch('http://localhost:3000/attempt/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answer,
          quizId
        })
      })
      this.attemptData = await data.json();
      this.$router.push(`/quiz/${this.quizData.quizId}/${this.attemptData.attemptHash}`)
    },
    async updateAttempt(answer, attemptHash, finished) {
      const data = await fetch('http://localhost:3000/attempt/', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          attemptHash,
          answer,
          finished
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
  },
}

</script>
