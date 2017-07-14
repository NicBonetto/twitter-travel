const $views = document.querySelectorAll('.view')
const $searchItem = document.querySelector('#pac-input')
const $twitterContainer = document.querySelector('.twitter-container')

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
  const searchString = item.value

  let splitString = searchString.split(',')
  splitString.splice(1, 100)
  let newString = splitString.toString().split(' ')
  let sendString = newString.reduce((total, element) => {
    return total + element
  })
  return sendString
}

function renderTwitterElements(response) {
  const $tweetList = document.createElement('ul')

  response.forEach(element => {
    const $tweetLi = document.createElement('li')
    const $mediaImg = document.createElement('div')
    const $img = document.createElement('img')
    const $name = document.createElement('h5')
    const $text = document.createElement('p')
    const $mediaBody = document.createElement('div')

    for (const property in element) {
      if (property === 'text') {
        $text.textContent =  element[property]
      }
      else if (property === 'user') {
        $name.textContent = element[property].name
        $img.src = element[property].profile_image_url
      }
    }

    $tweetLi.classList.add('media')
    $name.classList.add('media-heading')
    $img.classList.add('media-object')
    $mediaImg.classList.add('media-left')
    $mediaBody.classList.add('media-body')

    $mediaImg.appendChild($img)
    $mediaBody.appendChild($name)
    $mediaBody.appendChild($text)
    $tweetLi.appendChild($mediaImg)
    $tweetLi.appendChild($mediaBody)
    $tweetList.appendChild($tweetLi)
  })
  $tweetList.classList.add('media-list')
  return $tweetList
}

router.listen()
