<template>
  <button
    v-if="!link"
    :class="mode"
  >
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="to"
    :class="mode"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: [String, Object],
      required: false,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  padding: 3.5px 12px;
  font: inherit;
  background-color: $base-color;
  border: 1px solid $base-color;
  color: $link-hover-color;
  cursor: pointer;
  border-radius: 4px;
  display: inline-block;
}

.flat {
  background-color: transparent;
  color: $flat-btn-color;
  border: none;
}

.outline {
  display: flex;
  height: 28px;
  line-height: 20px;
  background-color: $base-color;
  border-color: $base-color;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.link{
  color: $base-color;
  background: $link-hover-color;
  border: 1px solid $base-color;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.link:hover, .link:active{
  color: $link-btn-hover-color;
}

.link:hover{
  background-color: $coming-holiday-bg-color;
}

.close{
  padding: 0;
  font-size: 23px;
}

.action-btn{
  border: none;
  background: none;
  margin: 0 1rem 0 0;
  padding: 0;
}

.action-btn:hover, .action-btn:active{
  opacity: .8;
  background: none;
}

.close:hover, .close:active{
  background-color: transparent;
  border-color: transparent;
  color: $close-btn-hover-color;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active,
.controls a:hover,
.controls a:active{
  opacity: .8;
}

.outline:hover,
.outline:active{
  color: $link-hover-color;
}
</style>
