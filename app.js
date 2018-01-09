const Twitter = require('twitter')
const config = require('./config')
const Client = new Twitter(config)

const parameters = {
  q: 'Buhari Atiku',
  lang: 'en',
  result_type: 'mixed',
  count: 50

}

Client.get('search/tweets', parameters, (err, data) => {
  if (!err) {
    for (let i = 0; i < data.statuses.length; i++) {
      let tweet_id = {id: data.statuses[i].id_str}
      Client.post('favorites/create', tweet_id, (err, response) => {
        if (err) {
          console.log(err[0].message)
        }
        else {
          let screenName = response.user.screen_name
          let tweetId = response.id_str
          console.log('Bookmarked: ', 'https://twitter.com/${screenName}/status/${tweetId}')
        }
      })
    }
  } else {
    console.log(err)
  }
})
