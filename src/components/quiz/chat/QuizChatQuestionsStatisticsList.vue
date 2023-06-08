<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <section class="quiz-section">
    <base-card>
      <base-spinner v-if="isLoading"/>
      <template v-else-if="hasChatQuestionsData">
        <h4 class="h4 chat-history-heading">Questions Statistics</h4>
        <table class="table">
          <thead>
          <tr>
            <th v-for="(heading, index) in tableHeadings"
                :class="toggleSortingClass(heading, index)"
                @click="sortScores($event, index)"
            >{{ heading }}
            </th>
          </tr>
          </thead>
          <tbody>
          <quiz-chat-questions-statistics-item v-for="questionData in chatQuestionsData"
                                               :key="new Date()"
                                               :chat="questionData.chat"
                                               :correctAnswers="questionData.correctAnswers"
                                               :percentage="questionData.percentageCorrectAnswers"
                                               :totalQuestions="questionData.totalQuestions"
          ></quiz-chat-questions-statistics-item>
          </tbody>
        </table>
        <quiz-pagination :total-pages="totalPages" @load-quiz="loadChatQuestionsData"/>
      </template>
      <div v-else class="item">No chat questions statistics found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import { mapGetters } from 'vuex'
import QuizChatQuestionsStatisticsItem from '@/components/quiz/chat/QuizChatQuestionsStatisticsItem'
import QuizPagination from '@/components/quiz/QuizPagination'

export default {
  name: 'QuizChatQuestionsStatisticsList',
  components: {
    QuizPagination,
    QuizChatQuestionsStatisticsItem
  },
  mixins: [ErrorMixin],
  data() {
    return {
      sortOption: 'totalQuestions,DESC',
    }
  },
  computed: {
    tableHeadings() {
      return ['Chat', 'Total Questions', 'Correct Answers', '%']
    },
    fieldNames() {
      return Object.keys(this.chatQuestionsData[0])
    },
    ...mapGetters({
      chatQuestionsData: 'quiz/chatQuestionsData',
      hasChatQuestionsData: 'quiz/hasChatQuestionsData',
      totalPages: 'quiz/totalPages',
      currentPage: 'quiz/currentPage'
    })
  },
  methods: {
    async loadChatQuestionsData(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchChatQuestionsData', {
          page,
          sort: this.sortOption
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching questions statistics!'
      }
      this.isLoading = false
    },
    sortScores(e, index) {

      if (!e.target.classList.contains('sorting')) {
        return
      }
      this.sortOption = (this.sortOption.endsWith('DESC')) ? `${this.fieldNames[index]},ASC` : `${this.fieldNames[index]},DESC`
      e.target.classList.toggle('sorting-asc')
    },
    toggleSortingClass(heading, index) {
      if (heading === 'Chat') return

      const sorting = {
        [`${this.fieldNames[index]},DESC`]: 'sorting-desc',
        [`${this.fieldNames[index]},ASC`]: 'sorting-asc'
      }

      return `${sorting[this.sortOption] ? sorting[this.sortOption] : ''} sorting`
    }
  },
  created() {
    this.$store.commit('quiz/setCurrentPage', 0)
    this.loadChatQuestionsData(0)
  },
  watch: {
    sortOption() {
      this.loadChatQuestionsData(0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
