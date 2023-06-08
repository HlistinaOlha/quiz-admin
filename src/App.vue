<template>
  <div class="content">
    <the-header/>
    <header-navigation/>
    <router-view></router-view>
  </div>
  <the-footer/>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader'
import TheFooter from '@/components/layout/TheFooter'
import HeaderNavigation from '@/components/layout/HeaderNavigation'

export default {
  components: {
    HeaderNavigation,
    TheFooter,
    TheHeader
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
  margin-bottom: 2rem;
}
</style>

