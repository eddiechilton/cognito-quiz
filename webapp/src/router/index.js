import { createWebHashHistory, createRouter } from 'vue-router'

import Quiz from '../components/Quiz.vue'

const routes = [
    { path: '/quiz/:quizId/:attemptHash?', component: Quiz },
]

const router = createRouter({
history: createWebHashHistory(),
routes,
})

export default router