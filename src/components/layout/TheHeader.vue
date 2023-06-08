<template>
  <header v-if="isAuthenticated">
    <div class="container d-flex flex-column align-items-start justify-content-between">
      <div class="mt-3 d-flex justify-content-between w-100 align-items-center">
        <h1 class="h1">
          <router-link class="nav-link" to="/">
            <img alt="robot"
                 class="robot"
                 src="data:image/png;base64,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">
            Quiz Admin
          </router-link>
        </h1>
        <div v-show="!isProduction" class="test-mode">This is the test mode =)</div>
      </div>
    </div>
  </header>
</template>

<script>
import store from '@/store'

export default {
  name: 'TheHeader',
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated
    },
    isProduction() {
      return JSON.parse(process.env.VUE_APP_IS_PRODUCTION)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 70px;
  font-size: .875rem;
  background: $link-hover-color;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 19px 34px -15px #d2d2f2;
  border-bottom: 1px solid $main-border-color;
}

header .nav-link {
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #6d7080;
}

.nav-link span {
  font-weight: 400;
}

h1 {
  margin: 0;
}

h1 .nav-link {
  font-size: 21px
}

.nav-link {
  margin: 0;
  padding: 15px 10px;
  font-weight: 500;
}

h1 .nav-link:hover,
h1 .nav-link:active,
h1 .nav-link.router-link-active {
  border-color: transparent;
}

.robot {
  vertical-align: bottom;
  margin-right: 10px;
}

.test-mode{
  color: #6d7080;
}

@keyframes dropdownAnimation {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }
  100% {
    opacity: 1;
    transform: none;
    transform: translateZ(0);
  }
}
</style>
