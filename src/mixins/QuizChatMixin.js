export default {
  computed: {
    chatName() {
      if (this.chat.title) {
        return `<span>${this.chat.title}</span>`
      } else if (!this.chat.firstName) {
        return `<i>(${this.chat.username})</i>`
      } else {
        return `<span>${this.chat.firstName} <i>(${this.chat.username})</i></span>`
      }
    }
  }
}
