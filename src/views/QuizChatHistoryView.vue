<template>
  <base-heading heading="Chat History"/>
  <div class="chat-container d-flex flex-row justify-content-between mx-auto">
    <quiz-chat-answers-dashboard/>
    <quiz-chat-leaders-scores-list/>
  </div>
  <quiz-chat-questions-statistics-list/>
</template>

<script>
import QuizChatAnswersDashboard from '@/components/quiz/chat/QuizChatAnswersDashboard'
import QuizChatLeadersScoresList from '@/components/quiz/chat/QuizChatLeadersScoresList'
import QuizChatQuestionsStatisticsList from '@/components/quiz/chat/QuizChatQuestionsStatisticsList'

export default {
  name: 'QuizChatHistoryView',
  components: {
    QuizChatQuestionsStatisticsList,
    QuizChatLeadersScoresList,
    QuizChatAnswersDashboard
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  width: $container-max-width;
}
</style>
