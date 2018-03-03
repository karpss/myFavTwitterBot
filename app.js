const Twitter = require('twitter')
const config = require('./config')
const client = new Twitter(config)
const util = require('util')

const parameters = {
  q: 'Buhari Atiku',
  lang: 'en',
  result_type: 'mixed',
  count: 50

}
let get = util.promisify(client.get).bind(client)
get('search/tweets', parameters,)
  .then((data) => {

    for (let i = 0; i < data.statuses.length; i++) {
      let tweet_id = {id: data.statuses[i].id_str}
      client.post('favorites/create', tweet_id, (err, response) => {
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

  })
  .catch((err) => {
    console.log('Error', err)
  })




