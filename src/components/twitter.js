import React from 'react'

export const TwitterFeed = (props) => (
  <div>
    <div>
      {props.tweets.map((tweet, i) =>
        <div className='ui raised segment' key={i} dangerouslySetInnerHTML={({ __html: tweet })} />
      )}
    </div>
  </div>
)

TwitterFeed.propTypes = {
  tweets: React.PropTypes.array.isRequired
}

export default TwitterFeed
