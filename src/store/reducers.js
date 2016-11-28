import { combineReducers } from 'redux'
import { REQUEST_TWEETS, RECEIVE_TWEETS, CHANGE_TWITTER } from './actions'

const currentTwitter = (state = 'realDonaldTrump', action) => {
  switch (action.type) {
    case CHANGE_TWITTER:
      return action.twitterScreenName
    default:
      return state
  }
}

const timeline = (state = {
  isFetching: false,
  tweets: []
}, action) => {
  switch (action.type) {
    case REQUEST_TWEETS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_TWEETS:
      return Object.assign({}, state, {
        isFetching: false,
        tweets: action.tweets
      })
    default:
      return state
  }
}

const getUserTimeline = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TWEETS:
    case REQUEST_TWEETS:
      return Object.assign({}, state, {
        [action.twitterScreenName]: timeline(state[action.twitterScreenName], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  getUserTimeline,
  currentTwitter
})

export default rootReducer
