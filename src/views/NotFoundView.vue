<template>
  <section>
    <base-card>
      <h2>Page not found!</h2>
      <p>Maybe view our
        <router-link class="link" to="/">Quiz Admin Main Page</router-link>
        ?
      </p>
    </base-card>
  </section>
</template>

<script>

export default {
  name: "NotFoundView"
}
</script>

<style lang="scss" scoped>
.link{
  color: $base-color;
}
.link:hover{
  opacity: .8;
}
</style>
