import { handleErrors, setPageInfo } from '@/main'

export default {
  state: () => ({
    categories: [],
    quizzes: [],
    quizzesQuestions: [],
    questions: [],
    questionsSelectedOptions: [],
    statistics: {},
    userScores: [],
    leadersScores: [],
    chatAnswersData: {},
    chatQuestionsData: [],
    questionFacets: [],
    currentPage: 0,
    pageSize: 7,
    totalPages: 1
  }),
  getters: {
    categories(state) {
      return state.categories
    },
    hasCategories(state) {
      return state.categories && state.categories.length > 0
    },
    quizzes(state) {
      return state.quizzes
    },
    hasQuizzes(state) {
      return state.quizzes && state.quizzes.length > 0
    },
    quizzesQuestions(state) {
      return state.quizzesQuestions
    },
    hasQuizzesQuestions(state) {
      return state.quizzesQuestions && state.quizzesQuestions.length > 0
    },
    questions(state) {
      return state.questions
    },
    hasQuestions(state) {
      return state.questions && state.questions.length > 0
    },
    questionsSelectedOptions(state) {
      return state.questionsSelectedOptions
    },
    hasQuestionsSelectedOptions(state) {
      return state.questionsSelectedOptions && state.questionsSelectedOptions.length > 0
    },
    chartData(state) {
      return state.statistics.creationMonthlyStatistic
    },
    chartBadgesData(state) {
      return {
        totalQuestions: state.statistics.totalQuestions,
        totalCategories: state.statistics.totalCategories,
        totalQuizzes: state.statistics.totalQuizzes
      }
    },
    hasChartData(state) {
      return state.statistics.creationMonthlyStatistic && state.statistics.creationMonthlyStatistic.length > 0
    },
    userScores(state) {
      return state.userScores
    },
    hasUserScores(state) {
      return state.userScores && state.userScores.length > 0
    },
    leadersScores(state) {
      return state.leadersScores
    },
    hasLeadersScores(state) {
      return state.leadersScores && state.leadersScores.length > 0
    },
    chatAnswersData(state) {
      return state.chatAnswersData
    },
    hasChatAnswersData(state) {
      return state.chatAnswersData && Object.keys(state.chatAnswersData).length > 0
    },
    chatQuestionsData(state) {
      return state.chatQuestionsData
    },
    hasChatQuestionsData(state) {
      return state.chatQuestionsData && state.chatQuestionsData.length > 0
    },
    currentPage(state) {
      return state.currentPage
    },
    pageSize(state) {
      return state.pageSize
    },
    totalPages(state) {
      return state.totalPages
    }
  }
  ,
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    },
    setQuizzes(state, payload) {
      state.quizzes = payload
    },
    setQuizzesQuestions(state, payload) {
      state.quizzesQuestions = payload
    },
    setQuestions(state, payload) {
      state.questions = payload
    },
    setStatistics(state, payload) {
      state.statistics = payload
    },
    setUserScores(state, payload) {
      state.userScores = payload
    },
    setChatAnswersData(state, payload) {
      state.chatAnswersData = payload
    },
    setChatQuestionsData(state, payload) {
      state.chatQuestionsData = payload
    },
    setLeadersScores(state, payload) {
      state.leadersScores = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    },
    setPageSize(state, payload) {
      state.pageSize = payload
    },
    setPageInfo(state, { currentPage, pageSize, totalPages }) {
      state.currentPage = currentPage
      state.pageSize = pageSize
      state.totalPages = totalPages
    }
  }
  ,
  actions: {
    async fetchCategories({ getters, commit, rootGetters }, page) {
      let pageSize = getters.pageSize

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/categories?page=${page}&pageSize=${pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      setPageInfo(commit, responseData)
      commit('setCategories', responseData.result)
    },
    async fetchQuizzes({ getters, commit, rootGetters }, page) {
      let pageSize = getters.pageSize

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/quizzes?page=${page}&pageSize=${pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      setPageInfo(commit, responseData)
      commit('setQuizzes', responseData.result)
    },
    async fetchQuizzesQuestions({ getters, commit, rootGetters }, id) {

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/quizzes/${id}/questions`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      commit('setQuizzesQuestions', responseData)
    },
    async fetchQuestions({ getters, commit, rootGetters }, page) {
      let pageSize = getters.pageSize

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/questions?page=${page}&pageSize=${pageSize}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      setPageInfo(commit, responseData)
      commit('setQuestions', responseData.result)
    },
    async fetchStatistics({ getters, commit, rootGetters }) {

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/statistics`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      commit('setStatistics', responseData)
    },
    async fetchChatUserScores({ getters, commit, rootGetters }, { page, sort }) {
      let pageSize = getters.pageSize

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/chat/users/score?page=${page}&pageSize=${pageSize}&sort=${sort}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      setPageInfo(commit, responseData)
      commit('setUserScores', responseData.result)
    },
    async fetchChatLeadersScores({ commit, rootGetters }) {

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/chat/leaders/score`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      commit('setLeadersScores', responseData)
    },
    async fetchChatAnswersData({ commit, rootGetters }) {

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/chat/answers/statistics`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      commit('setChatAnswersData', responseData)
    },
    async fetchChatQuestionsData({ getters, commit, rootGetters }, { page, sort }) {
      let pageSize = getters.pageSize

      const response = await fetch(`http://${process.env.VUE_APP_HOST}/api/v2/quiz/chat/questions/statistics?page=${page}&pageSize=${pageSize}&sort=${sort}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${rootGetters.authToken}`
        }
      })
      const responseData = await response.json()

      if (!response.ok) {
        handleErrors(responseData, 'Failed to fetch')
      }

      setPageInfo(commit, responseData)
      commit('setChatQuestionsData', responseData.result)
    }
  },
  namespaced: true
}
