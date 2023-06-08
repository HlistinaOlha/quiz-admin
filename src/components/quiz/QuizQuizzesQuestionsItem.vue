<template>
  <li>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <div>{{indexNum}}) {{ name }}</div>
    <div class="time">
      <span class="time-icon material-symbols-outlined">schedule</span>{{ convertedTime }}</div>
  </li>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizMixin from '@/mixins/QuizMixin'

export default {
  name: 'QuizQuizzesQuestionsItem',
  mixins: [ErrorMixin, QuizMixin],
  props: ['quizName', 'name', 'index', 'creationTime'],
  computed: {
    indexNum(){
      return this.index + 1;
    }
  }
}
</script>

<style lang="scss" scoped>
ul.table li {
  border-radius: 8px;
  background-color: rgb(40 146 253 / 10%);
  padding: 16px;
  margin-bottom: 16px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  box-shadow: 0 19px 8px -15px #d2d2f2;
}

.time{
  width: 100%;
}
</style>
