export const REQUEST_TWEETS = 'REQUEST_TWEETS'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const CHANGE_TWITTER = 'CHANGE_TWITTER'

const requestTweets = (twitterScreenName) => ({
  type: REQUEST_TWEETS,
  twitterScreenName
})

const receiveTweets = (twitterScreenName, tweets) => ({
  type: RECEIVE_TWEETS,
  twitterScreenName,
  tweets
})

export const changeTwitter = (prevTwitter) => ({
  type: CHANGE_TWITTER,
  twitterScreenName: ((twitters, prevTwitter) => {
    const prevIndex = twitters.indexOf(prevTwitter)
    const nextIndex = twitters.length <= (prevIndex + 1) ? 0 : prevIndex + 1
    return twitters[nextIndex]
  })(['realDonaldTrump', 'HillaryClinton', 'barackobama', 'jfdoube'], prevTwitter)
})

const fetchTweets = (twitterScreenName) =>
  dispatch => {
    dispatch(requestTweets(twitterScreenName))
    return fetch(`https://cors-anywhere.herokuapp.com/https://twitter.com/${twitterScreenName}`)
      .then(response => response.text())
      .then(text => {
        /**
         * js regex api is such a bitch, i should use an abstraction here,
         * but I was lazy and did not want to add more dependencies
         */
        const tweetTextRegex = /<p.+data-aria-label-part="0">(.+)<\/p>/g
        const results = []
        let match = tweetTextRegex.exec(text)
        while (match) {
          results.push(match)
          match = tweetTextRegex.exec(text)
        }
        return results
      })
      .then(results => results.reduce((accumulator, value) => {
        if (value[1]) {
          accumulator.push(value[1])
        }
        return accumulator
      }, []))
      .then(tweets => dispatch(receiveTweets(twitterScreenName, tweets)))
  }

export const getTimeline = (twitterScreenName) =>
  dispatch =>
    dispatch(fetchTweets(twitterScreenName))
