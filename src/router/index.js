import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView'
import UserAuthView from '@/views/UserAuthView'
import store from '@/store'
import HomeView from '@/views/HomeView'
import QuizCategoriesView from '@/views/QuizCategoriesView'
import QuizQuestionsView from '@/views/QuizQuestionsView'
import QuizDashboardView from '@/views/QuizDashboardView'
import QuizQuizzesView from '@/views/QuizQuizzesView'
import QuizQuizzesQuestionsView from '@/views/QuizQuizzesQuestionsView'
import QuizUserScoresView from '@/views/QuizUserScoresView'
import QuizChatHistoryView from '@/views/QuizChatHistoryView'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/categories',
    name: 'quizCategories',
    component: QuizCategoriesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/dashboard',
    name: 'quizDashboard',
    component: QuizDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/quizzes',
    name: 'quizQuizzes',
    component: QuizQuizzesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/quizzes/:id/questions',
    name: 'quizQuizzesQuestions',
    component: QuizQuizzesQuestionsView,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/questions',
    name: 'quizQuestions',
    component: QuizQuestionsView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/dashboard',
    name: 'quizDashboard',
    component: QuizDashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/chat/users/scores',
    name: 'quizUserScores',
    component: QuizUserScoresView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quiz/chat/history',
    name: 'quizChatHistory',
    component: QuizChatHistoryView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: UserAuthView,
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/:notFound(.*)',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch('tryLogin').then(() => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      next('/login')
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  })
})

export default router
