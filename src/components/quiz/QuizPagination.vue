<template>
  <nav v-if="totalPages > 1" class="pagination">
    <paginate
      v-model=currentPage
      :click-handler="setPageParams"
      :container-class="''"
      :first-button-text="'«'"
      :first-last-button="true"
      :last-button-text="'»'"
      :next-class="'hidden'"
      :nextLinkClass="'page-link'"
      :page-class="'page-item'"
      :page-count="totalPages"
      :page-link-class="'page-link'"
      :prev-class="'hidden'"
      :prevLinkClass="'page-link'"
    />
  </nav>
</template>

<script>

export default {
  name: 'QuizPagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.getters['quiz/currentPage'] + 1;
      },
      set(value) {
        this.$store.commit('quiz/setCurrentPage', value - 1);
      }
    }
  },
  methods: {
    setPageParams(pageNum) {
      this.$emit('load-quiz', pageNum-1);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
