const counter = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment (state, payload) {
      return state + payload
    },
    test(state, payload) {
      console.log('will be invoked only once server side')
      return 1
    }
  },
  effects: {
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync (payload, rootState) {
	    console.log('will be invoked n+1 server side')
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment(payload)
    }
  }
}

export default counter
