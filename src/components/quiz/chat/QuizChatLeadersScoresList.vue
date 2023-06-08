<template>
  <base-dialog
    :show="!!error"
    title="Fetch Error"
    @close="handleError"
  >{{ error }}
  </base-dialog>
  <section class="quiz-section">
    <base-spinner v-if="isLoading"/>
    <base-card v-else-if="hasScores"
               class="mt-0 mb-0 pb-0">
      <h4 class="h4 chat-history-heading">Top Leaders</h4>
      <ul>
        <quiz-chat-leaders-scores-item
          v-for="score in scores"
          :key="new Date()"
          :chat="score.chat"
          :correctAnswers="score.correctAnswers"
          :user="score.user"
        />
      </ul>
    </base-card>
    <base-card v-else>
      <div class="item">No leaders scores found.</div>
    </base-card>
  </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizChatLeadersScoresItem from '@/components/quiz/chat/QuizChatLeadersScoresItem'
import { mapGetters } from 'vuex'
import BaseWidget from '@/components/UI/BaseWidget'

export default {
  name: 'QuizChatLeadersScoresList',
  components: {
    BaseWidget,
    QuizChatLeadersScoresItem
  },
  mixins: [ErrorMixin],
  computed: {
    ...mapGetters({
      scores: 'quiz/leadersScores',
      hasScores: 'quiz/hasLeadersScores',
    })
  },
  methods: {
    async loadLeadersScores() {
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchChatLeadersScores')
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching leaders scores!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.loadLeadersScores()
  }
}
</script>

<style lang="scss" scoped>
.quiz-section {
  flex: 0 0 56%;
}

.chat-history-heading {
  border-bottom: 1px solid $border-bottom-color;
}
</style>
