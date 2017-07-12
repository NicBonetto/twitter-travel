class HashRouter {
  constructor($views) {
    this.isListening = false
    this.$views = $views
  }
  match(hash) {
    this.$views.forEach((element) => {
      if (element.id === hash) {
        element.classList.remove('hidden')
      }
      else if (!element.classList.contains('hidden')) {
        element.classList.add('hidden')
      }
    })
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => this.match(window.location.hash))
    this.isListening = true
  }
}

const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
