<template>
  <li class="d-flex align-items-center">
    <div class="flex-grow-1">
      <h6 class="h6 fs-14 mb-1">{{ user.firstName }} <i v-if="user.username">({{ user.username }})</i></h6>
      <p v-if="chat" class="text-muted mb-0" v-html="chatName"></p>
    </div>
    <span>{{ correctAnswers }}</span>
  </li>
</template>

<script>
import QuizChatMixin from '@/mixins/QuizChatMixin'

export default {
  name: 'QuizChatLeadersScoresItem',
  props: ['user', 'chat', 'correctAnswers'],
  mixins: [QuizChatMixin]
}
</script>

<style lang="scss" scoped>
li{
  padding: 0.97rem 0.5rem;
}

li:not(:last-of-type){
  border-bottom: 1px dashed $border-bottom-color;
}

.h6{
  font-size: 14px;
}

.text-muted{
  font-size: 12px;
}
</style>
