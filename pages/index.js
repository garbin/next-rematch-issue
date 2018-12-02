import React, { Component } from 'react'
import { dispatch } from '@rematch/core'
import { initStore } from '../shared/store'
import withRematch from '../shared/utils/withRematch'
import Header from '../shared/components/header'

class Home extends Component {
	static async getInitialProps ({store}) {
    store.dispatch.counter.test() // this will be called only once each request
    await store.dispatch.counter.incrementAsync(1)	// this will be called n+1 times(n is the times you refresh your page) each request
    return {}
	}
  render () {
    return (
      <div>
        <Header />
        <h1> Counter </h1>
        <h3>The count is {this.props.counter}</h3>
        <p>
          <button onClick={this.props.increment}>increment</button>
          <button onClick={() => dispatch.counter.increment(1)}>
            increment (using dispatch function)
          </button>
          <button onClick={this.props.incrementBy(5)}>increment by 5</button>
          <button onClick={this.props.incrementAsync}>incrementAsync</button>
        </p>
        <br />
      </div>
    )
  }
}

const mapState = state => ({
  counter: state.counter
})

const mapDispatch = ({ counter: { increment, incrementAsync } }) => ({
  increment: () => increment(1),
  incrementBy: amount => () => increment(amount),
  incrementAsync: () => incrementAsync(1)
})

export default withRematch(initStore, mapState, mapDispatch)(Home)
