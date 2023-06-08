<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <section class="quiz-section">
      <base-heading heading="Quizzes"/>
      <base-spinner v-if="isLoading"/>
      <ul v-else-if="hasQuizzes">
        <quiz-quizzes-item v-for="quiz in quizzes"
                           :id="quiz.id"
                           :key="quiz.id"
                           :categoryLink="quiz.quizCategory.link"
                           :categoryName="quiz.quizCategory.name"
                           :creationTime="quiz.creationTime"
                           :level="quiz.level"
                           :link="quiz.link"
                           :name="quiz.name"
                           :questionSize="quiz.questionSize"
        ></quiz-quizzes-item>
      </ul>
      <base-card v-else>
        <div class="item">No quizzes found.</div>
      </base-card>
      <quiz-pagination :total-pages="totalPages" @load-quiz="loadQuizzes"/>
    </section>
  </div>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizQuizzesItem from '@/components/quiz/QuizQuizzesItem'

export default {
  name: 'QuizQuizzesList',
  components: {
    QuizQuizzesItem,
    QuizPagination
  },
  mixins: [ErrorMixin],
  computed: {
    currentPage() {
      return this.$store.getters['quiz/currentPage']
    },
    quizzes() {
      return this.$store.getters['quiz/quizzes']
    },
    hasQuizzes() {
      return this.$store.getters['quiz/hasQuizzes']
    },
    totalPages() {
      return this.$store.getters['quiz/totalPages']
    }
  },
  methods: {
    async loadQuizzes(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchQuizzes', page)
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching quizzes!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.$store.commit('quiz/setCurrentPage', 0)
    this.loadQuizzes()
  }
}
</script>

<style lang="scss" scoped>
.card-title {
  margin: 0;
}
</style>
