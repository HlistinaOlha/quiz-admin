export default {
  computed: {
    convertedTime() {
      return new Date(this.creationTime).toLocaleString('en', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    },
    gameLevel() {
      return this.level.toLowerCase()
    },
  }
}
