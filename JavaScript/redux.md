# Redux

### Why Redux

- Good for managing large state
- Useful for sharing data between componets
- Predictable state management using the 3 principles
  1. Single source of truth
  2. State is read only
  3. Changes using pure functions

### How it works

`Action` -->-- `Reducer` -->-- `Store` -->-- DOM changes

### FLUX pattern vs MVC pattern

- Flux  
  Action -> Dispatcher -> Store -> View (unidirectional data flow)
- MVC  
  Action -> Controller -> Model -> View

### Actions

1. Plain JS object.
2. Informations that send data from your application to your store
3. Must have a type property (as a string constants)
4. Action Creators: functions which returns Action object
5. Describe 'What happened'

### Reducers

1. `const <reducer> = (previousState, action) => {return nextState}`
2. describe how the application's state changes
3. Never to these in reducer
   - Mutate its arguments; (ex. use Array methods which return new Array)
   - Perform side effects like API calls and routing transitions;
   - Call non-pure functions, e.g. Date.now() or Math.random().

### Store

- Holds application state;

```js
{
dispatch: ƒ dispatch(action) // Allows state to be updated
subscribe: ƒ subscribe(listener) // 1) Registers listeners
// 2) Handles unregistering of listeners via the function returned
getState: ƒ getState() // Allows access to state
replaceReducer: ƒ replaceReducer(nextReducer)
Symbol(observable): ƒ observable()
}
```

### Data Flow

- Strict unidirectional data flow

### Example Code

```js
// Action Creator
const addColor = value => {
  return { type: "ADD", color: value };
};
const removeColor = value => {
  return { type: "REMOVE", color: value };
};

// Reducer
const favColors = (state, action) => {
  // Check if state already exists
  if (state === undefined) {
    state = [];
  }
  // Depends on the Action Type
  if (action.type === "ADD") {
    return state.concat(action.color);
  } else if (action.type === "REMOVE") {
    return state.filter(item => {
      return item !== action.color;
    });
  } else {
    return state;
  }
};

// Store
const store = Redux.createStore(favColors);
store.subscribe(() => {
  console.log(store.getState());
});

// Send Actions to Reducers to store states in Store
store.dispatch(addColor("blue"));
store.dispatch(addColor("red"));
store.dispatch(addColor("yellow"));

// Check the state with .getState()
////   console.log(store.getState());
```
