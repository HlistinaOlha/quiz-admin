<template>
  <input class="form-check-input"
         type="checkbox"
         @input="updateChecked"
         :value="label"
         :id="id"
         :checked="checked"
         role="button">
  <label class="form-check-label d-inline-block"
         :for="id"
         role="button">{{ label }}</label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  emits: ['update:checked'],
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean
    }
  },
  methods: {
    updateChecked(event) {
      this.$emit('update:checked', event.target.checked)
    }
  }
}
</script>

<style scoped lang="scss">
.form-check-input {
  &:checked {
    background-color: $link-btn-hover-color;
    border-color: $link-btn-hover-color;
  }
}
</style>
