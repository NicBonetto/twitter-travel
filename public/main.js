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

function createElement(tagName, attributes) {
  const $element = document.createElement(tagName)

  for (const property in attributes) {
    $element.setAttribute(property, attributes[property])
  }
  return $element
}

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

function createCarousel(data) {
  const $carouselContainer = createElement('div', { class: 'carousel slide', 'data-ride': 'carousel' })
  const $carousel = createElement('div', { class: 'carousel-inner text-center', role: 'listbox'})

  data.forEach((element, index) => {
    let $item
    let $inner
    if (index === 0) {
      $item = createElement('div', { class: 'item active' })
    }
    else {
      $item = createElement('div', { class: 'item' })
    }

    switch (index) {
      case 0: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'First slide' })
        break
      case 1: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Second slide' })
        break
      case 2: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Third slide' })
        break
      case 3: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Fourth slide' })
        break
      case 4: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Fifth slide' })
        break
      case 5: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Sixth slide' })
        break
      case 6: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Seventh slide' })
        break
      case 7: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Eighth slide' })
        break
      case 8: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Ninth slide' })
        break
      case 9: $inner = createElement('img', { class: 'carousel-image', src: element.image, alt: 'Tenth slide' })
        break
      default: console.log('Carousel Creation Error!')
    }
    const $caption = createElement('div', { class: 'carousel-caption' })
    const $text = createElement('h3', { class: 'font-style carousel-text' })

    $text.textContent = element.location_name

    $item.appendChild($inner)
    $caption.appendChild($text)
    $item.appendChild($caption)
    $carousel.appendChild($item)
  })
  $carouselContainer.appendChild($carousel)
  return $carouselContainer
}

router.listen()
