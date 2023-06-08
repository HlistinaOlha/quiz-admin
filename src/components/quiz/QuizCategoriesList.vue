<template>
    <base-dialog
      :show="!!error"
      title="Fetch Error"
      @close="handleError"
    >{{ error }}
    </base-dialog>
    <section class="quiz-section">
      <base-heading heading="Categories"/>
      <base-card>
        <base-spinner v-if="isLoading"/>
        <ul v-else-if="hasCategories" class="table">
          <base-table-heading :items="tableHeadings"/>
          <quiz-categories-item v-for="category in categories"
                        :key="category.name"
                        :link="category.link"
                        :name="category.name"
          ></quiz-categories-item>
        </ul>
        <div v-else class="item">No categories found.</div>
        <quiz-pagination :total-pages="totalPages" @load-quiz="loadCategories"/>
      </base-card>
    </section>
</template>

<script>
import ErrorMixin from '@/mixins/ErrorMixin'
import QuizPagination from '@/components/quiz/QuizPagination'
import QuizCategoriesItem from '@/components/quiz/QuizCategoriesItem'

export default {
  name: 'QuizCategoriesList',
  components: { QuizCategoriesItem, QuizPagination },
  mixins: [ErrorMixin],
  computed: {
    tableHeadings() {
      return ['Name']
    },
    currentPage() {
      return this.$store.getters['quiz/currentPage']
    },
    categories() {
      return this.$store.getters['quiz/categories']
    },
    hasCategories() {
      return this.$store.getters['quiz/hasCategories']
    },
    totalPages() {
      return this.$store.getters['quiz/totalPages']
    }
  },
  methods: {
    async loadCategories(page) {
      page = page !== undefined ? page : 0
      this.isLoading = true
      try {
        await this.$store.dispatch('quiz/fetchCategories', page)
      } catch (error) {
        this.error = error.message || 'Something went wrong while fetching categories!'
      }
      this.isLoading = false
    }
  },
  created() {
    this.$store.commit('quiz/setCurrentPage', 0)
    this.loadCategories()
  }
}
</script>

<style lang="scss" scoped>

</style>
