<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <section class="quiz-section">
    <base-heading heading="Users Scores"/>
    <base-card>
      <base-spinner v-if="isLoading"/>
      <template v-else-if="hasScores">
        <table class="table">
          <thead>
          <tr>
            <th v-for="heading in tableHeadings"
                :class="toggleSortingClass(heading)"
                @click="sortScores"
            >{{ heading }}
            </th>
          </tr>
          </thead>
          <tbody>
          <quiz-chat-user-scores-item v-for="score in scores"
                                      :key="new Date()"
                                      :chat="score.chat"
                                      :correctAnswers="score.correctAnswers"
                                      :user="score.user"
          ></quiz-chat-user-scores-item>
          </tbody>
        </table>
        <quiz-pagination :total-pages="totalPages" @load-quiz="loadScores"/>
      </template>
      <div v-else class="item">No user scores found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizChatUserScoresItem from '@/components/quiz/chat/QuizChatUserScoresItem'
import QuizPagination from '@/components/quiz/QuizPagination'
import { mapGetters } from 'vuex'

export default {
  name: 'QuizChatUserScoresList',
  components: {
    QuizPagination,
    QuizChatUserScoresItem
  },
  mixins: [ErrorMixin],
  data() {
    return {
      sortOption: 'correctAnswers,DESC'
    }
  },
  computed: {
    tableHeadings() {
      return ['Chat', 'User', 'Correct answers']
    },
    ...mapGetters({
      scores: 'quiz/userScores',
      hasScores: 'quiz/hasUserScores',
      totalPages: 'quiz/totalPages',
      currentPage: 'quiz/currentPage'
    })
  },
  methods: {
    async loadScores(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchChatUserScores', {
          page,
          sort: this.sortOption
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching user scores!'
      }
      this.isLoading = false
    },
    sortScores(e) {
      if (!e.target.classList.contains('sorting')) {
        return
      }
      this.sortOption = (this.sortOption === 'correctAnswers,DESC') ? 'correctAnswers,ASC' : 'correctAnswers,DESC'
      e.target.classList.toggle('sorting-asc')
    },
    toggleSortingClass(heading) {
      if (heading !== 'Correct answers') return
      const sorting = {
        'correctAnswers,DESC': 'sorting-desc',
        'correctAnswers,ASC': 'sorting-asc'
      }
      return `${sorting[this.sortOption]} sorting`
    }
  },
  created() {
    this.$store.commit('quiz/setCurrentPage', 0)
    this.loadScores(0)
  },
  watch: {
    sortOption() {
      this.loadScores(0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
