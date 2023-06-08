<template>
  <div class="card" :class="mode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: $link-hover-color;
  border-radius: 5px;
  padding: 20px 30px;
  margin: 2rem auto;
  max-width: 60rem;
  border: none;
}

.card-long {
  max-width: 73rem;
}

</style>
