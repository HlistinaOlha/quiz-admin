<template>
  <div class="list-heading">
    <span v-for="item in items" class="item">{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseTableHeading',
  props: {
    items: {
      type: [Array, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-weight: $font-weight-medium;
}
</style>
