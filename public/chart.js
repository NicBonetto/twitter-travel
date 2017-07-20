let positive = 0
let negative = 0
let neutral = 0

function createChart(...data) {

  const newChart = {
    type: 'bar',
    data: {
      labels: [
        'Positive',
        'Negative',
        'Neutral'
      ],
      datasets: [{
        label: 'Sentiment',
        data: data,
        backgroundColor: [
          'rgba(36, 107, 97, 0.2)',
          'rgba(170, 57, 57, 0.2)',
          'rgba(170, 145, 57, 0.2)'
        ],
        borderColor: [
          'rgba(36, 107, 97, 1)',
          'rgba(170, 57, 57, 1)',
          'rgba(170, 145, 57, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  positive = 0
  negative = 0
  neutral = 0

  return newChart
}

function sentimentCount(tweet) {
  if (tweet.userSentiment === 'positive') {
    positive++
  }
  else if(tweet.userSentiment === 'negative') {
    negative++
  }
  else {
    neutral++
  }
}
