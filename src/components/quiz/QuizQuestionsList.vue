<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <section class="quiz-section">
      <base-heading heading="Questions" mode="card-long"/>
      <base-spinner v-if="isLoading"/>
      <base-card v-else-if="hasQuestions"
                 mode="card-long"
                 class="questions-wrapper p-0 d-flex flex-row justify-content-between">
        <quiz-questions-facets/>
        <ul class="question-item-container">
          <quiz-questions-item v-for="question in questions"
                               :id="question.quiz.id"
                               :key="question.creationTime"
                               :categoryLink="question.quiz.quizCategory.link"
                               :categoryName="question.quiz.quizCategory.name"
                               :creationTime="question.creationTime"
                               :level="question.quiz.level"
                               :link="question.quiz.link"
                               :name="question.name"
          ></quiz-questions-item>
        </ul>
      </base-card>
      <base-card v-else mode="card-long">
        <div class="item">No questions found.</div>
      </base-card>
      <quiz-pagination :total-pages="totalPages" @load-quiz="loadQuestions"/>
    </section>
  </div>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizQuestionsItem from '@/components/quiz/QuizQuestionsItem'
import QuizQuestionsFacets from '@/components/quiz/QuizQuestionsFacets'
import { mapGetters } from 'vuex'

export default {
  name: 'QuizQuestionsList',
  components: {
    QuizQuestionsFacets,
    QuizQuestionsItem,
    QuizPagination
  },
  mixins: [ErrorMixin],
  computed: {
    ...mapGetters({
      questions: 'quiz/questions',
      hasQuestions: 'quiz/hasQuestions',
      selectedOptions: 'quiz/questionsSelectedOptions',
      currentPage: 'quiz/currentPage',
      totalPages: 'quiz/totalPages'
    })

  },
  methods: {
    async loadQuestions(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchQuestions', page)
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching questions!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.$store.commit('quiz/setCurrentPage', 0)
    this.loadQuestions()
  },
  watch: {
    selectedOptions() {
      console.log('hi')
      this.loadQuestions()
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-wrapper {
  background-color: transparent;
}

.question-item-container {
  flex: 0 0 50rem;
}
</style>
