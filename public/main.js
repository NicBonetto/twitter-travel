const $views = document.querySelectorAll('.view')
const $mapPage = document.querySelector('#map-page')
const $searchItem = document.querySelector('#pac-input')

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

const router = new HashRouter($views)

function searchParser(item) {
  let searchString = item.value

  let splitString = searchString.split(',')
  splitString.splice(1, 100)
  let newString = splitString.toString().split(' ')
  let sendString = newString.reduce((total, element) => {
    return total + element
  })
  return sendString
}

$mapPage.addEventListener('mouseenter', () => {
  let fetchItem = searchParser($searchItem)
})

router.listen()
