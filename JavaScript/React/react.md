# React

### The Job Of a React Developer

1. Decide on Components
2. Decide the State and where it lives
3. What charges when state changes

### Why do we break things down into components?

- Flexibility of performance
- Easy to test
- We can combine each component with its concern.

### State vs Props

- One way data flow
- `State` lives in just one location and it trickles down as `props`

cf. `key` attribute: to distinguish when multiple components are rendered one after another.

- `setState` is an asynchronous function call. So we need to use call back function if we want to run certain function right after setState is done. `setState(updater[, callback])`
