<template>
  <div :class="mode"
       class="level m-0">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: {
    mode: {
      type: [String, Array],
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.level {
  font-size: 11px;
  padding: 3px 8px;
  color: $link-hover-color;
  width: fit-content;
  border-radius: 3px;
}

.average {
  background-color: $average-level-color;
}

.easier {
  background-color: $easier-level-color;
}

.tough {
  background-color: $tough-level-color;
}

.difficult {
  background-color: $difficult-level-color;
}

.very-difficult {
  background-color: $very-difficult-level-color
}
</style>
