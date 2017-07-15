//Declare variables
const $views = document.querySelectorAll('.view')
const $searchItem = document.querySelector('#pac-input')
const $twitterContainer = document.querySelector('.twitter-container')

//Changes screen view
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

//Creates a string to fetch
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

//Creates elements
function createElement(tagName, attributes) {
  const $element = document.createElement(tagName)

  for (const property in attributes) {
    $element.setAttribute(property, attributes[property])
  }
  return $element
}

//Creates tweets
function renderTwitterElements(response) {
  const $tweetList = document.createElement('ul')

  response.forEach(element => {
    const $tweetLi = createElement('li', { class: 'media' })
    const $mediaImg = createElement('div', { class: 'media-left' })
    const $img = createElement('img', { class: 'media-object' })
    const $name = createElement('h5', { class: 'media-heading' })
    const $text = createElement('p')
    const $mediaBody = createElement('div', { class: 'media-body' })
    let $sentiment

    if (element.userSentiment === 'positive') {
      $sentiment = createElement('div', { class: 'glyphicon glyphicon-triangle-top pull-right' })
      sentimentCount(element)
    }
    else if(element.userSentiment === 'negative') {
      $sentiment = createElement('div', { class: 'glyphicon glyphicon-triangle-bottom pull-right' })
      sentimentCount(element)
    }
    else {
      $sentiment = createElement('div', { class: 'glyphicon glyphicon-stop pull-right' })
      sentimentCount(element)
    }

    for (const property in element) {
      if (property === 'text') {
        $text.textContent =  element[property]
      }
      else if (property === 'user') {
        $name.textContent = element[property].name
        $img.src = element[property].profile_image_url
      }
    }

    $mediaImg.appendChild($img)
    $mediaBody.appendChild($sentiment)
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
