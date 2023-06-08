<template>
  <div class="widget">
    <div class="widget-container d-flex justify-content-between align-items-start">
      <div class="widget-subcontainer d-flex justify-content-between align-items-start">
        <img :src="icon"
             alt=""
             class="widget-icon">
        <router-link v-if="link" :to="target" class="quiz-parameter-label">{{ label }}</router-link>
        <span v-else class="quiz-parameter-label">{{ label }}</span>
      </div>
      <slot v-if="badge"></slot>
      <span v-else class="quiz-parameter-value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseWidget',
  props: {
    icon: {
      type: String,
      required: true,
      default: null
    },
    label: {
      type: String,
      required: true,
      default: null
    },
    value: {
      type: [String, Number],
      required: false,
      default: null
    },
    target: {
      type: [String, Object],
      required: false,
      default: null
    },
    badge: {
      type: Boolean,
      required: false,
      default: false
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.widget {
  background: $link-hover-color;
  border-radius: 5px;
  padding: 20px 30px;
  min-width: 18.5rem;
}

.widget-subcontainer {
  min-height: 45px;
  flex-direction: column;
}

.widget-icon {
  width: 25px;
}

.quiz-parameter-label {
  font-size: 12px;
}

a.quiz-parameter-label:hover {
  text-decoration: underline;
}

</style>
