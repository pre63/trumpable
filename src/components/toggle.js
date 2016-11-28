import React from 'react'
import { connect } from 'react-redux'
import { changeTwitter } from '../store/actions'

export const ToggleFeed = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    twitterScreenName: React.PropTypes.string.isRequired
  },
  render () {
    return (
      <div className='ui three item menu'>
        <a className='item' onClick={this.handleOnClick} >Toggle</a>
      </div>)
  },
  handleOnClick () {
    const { dispatch, twitterScreenName } = this.props
    console.log('thename', twitterScreenName)
    dispatch(changeTwitter(twitterScreenName))
  }
})
const mapStateToProps = (state) => {
  const { currentTwitter } = state
  return {
    twitterScreenName: currentTwitter
  }
}

export default connect(mapStateToProps)(ToggleFeed)
