import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTimeline } from '../store/actions'
import Tweeter from '../components/twitter'
import Toggle from '../components/toggle'

const cycleColors = () => {
  const random = Math.floor(Math.random() * 4)
  return ['#e1f7d5', '#ffbdbd', '#c9c9ff', '#f1cbff'][random]
}

const TwitterApp = React.createClass({
  propTypes: {
    twitterScreenName: PropTypes.string.isRequired,
    tweets: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  componentDidMount () {
    const { dispatch, twitterScreenName } = this.props
    dispatch(getTimeline(twitterScreenName))
    setInterval(() => {
      dispatch(getTimeline(twitterScreenName))
    }, 10000)
  },
  componentWillReceiveProps (nextProps) {
    if (nextProps.twitterScreenName !== this.props.twitterScreenName) {
      const { dispatch, twitterScreenName } = nextProps
      dispatch(getTimeline(twitterScreenName))
    }
  },
  render () {
    const { twitterScreenName, tweets, isFetching } = this.props
    return (
      <div className='funbackground' style={{ backgroundColor: isFetching ? cycleColors() : '' }}>
        <div className='narrow'>
          <Toggle />
          <section>
            <h1 className='ui horizontal divider header'>
              <i className='twitter icon' />
              {twitterScreenName}
            </h1>
            <div>
              {isFetching && tweets.length === 0 &&
                <div className='ui active centered inline loader' />
              }
              {!isFetching && tweets.length === 0 &&
                <div className='ui ignored info message'>No Tweets!</div>
              }
              {tweets.length > 0 &&
                <Tweeter tweets={tweets} />
              }
            </div>
          </section>
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  const { getUserTimeline, currentTwitter } = state
  const {
    isFetching,
    lastUpdated,
    tweets
  } = getUserTimeline[currentTwitter] || {
    isFetching: true,
    tweets: []
  }

  return {
    twitterScreenName: currentTwitter,
    tweets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(TwitterApp)
