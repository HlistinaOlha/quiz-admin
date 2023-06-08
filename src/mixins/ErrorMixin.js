export default {
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  methods: {
    handleError() {
      this.error = null;
    }
  }
}
