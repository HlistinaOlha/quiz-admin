<template>
  <tr>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <td v-if="chat" v-html="chatName"></td>
    <td>{{ totalQuestions }}</td>
    <td>{{ correctAnswers }}</td>
    <td>{{ percentage }}</td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex'
import QuizChatMixin from '@/mixins/QuizChatMixin'
import ErrorMixin from '@/mixins/ErrorMixin'

export default {
  name: 'QuizChatQuestionsStatisticsItem',
  props: ['chat', 'totalQuestions', 'correctAnswers', 'percentage'],
  mixins: [QuizChatMixin, ErrorMixin],
  computed: {
    ...mapGetters({
      currentPage: 'quiz/currentPage',
      pageSize: 'quiz/pageSize'
    })
  }
}
</script>

<style lang="scss" scoped>
td:nth-child(2) {
  width: auto;
}
</style>
