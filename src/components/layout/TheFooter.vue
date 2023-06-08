<template>
  <footer class="footer">
    <div class="container p-0">
      <div class="d-flex flex-nowrap justify-content-between">
        <span class="text p-0">2023 © quiz admin</span>
        <span class="text p-0">Design & Development by Alex&Honey</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 20px calc(1.5rem * .5);
  color: $footer-text-color;
  height: 60px;
  background-color: $link-hover-color;
  font-weight: $font-weight-normal;
  flex-shrink: 0;
}

.text {
  font-size: 13px;
  width: auto;
}
</style>
