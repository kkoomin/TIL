# Redux

### Why Redux

- Good for managing large state
- Useful for sharing data between componets
- Predictable state management using the 3 principles
  1. Single source of truth
  2. State is read only
  3. Changes using pure functions

### How it works

`Action` --(Middleware)->-- `(root)Reducer` -->-- `Store` -->-- DOM changes

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

- If the state isn't changed, it's not gonna re-render.

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

### Install

`npm i redux redux-logger react-redux`

### Example Code

```js
// Action Creator
const addColor = (value) => {
  return { type: "ADD", color: value };
};
const removeColor = (value) => {
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
    return state.filter((item) => {
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

### Redux with React

- In the `src` folder, create `redux` directory.
- And create `store.js` and `root-reducer.js` to make the different reducer modules and combine them into this.
- Make the separate directory, such as `user` and make the `user.action.js`, `user.reducer.js` and `user.types.js`(this is for setting the UserActionTypes not to hardcode all the types as a string)

## 메모

- 리덕스의 Provider를 사용할 땐 최상위 js, 즉 index.js에서 하기 (여기서 BrowserRoute도 설정)
- Redux 폴더를 만들어서 기능별로 하위 폴더 안에 action, action type, reducer를 정의하고, root-reducer.js에서 combineReducers() 실행 후 export
- store.dispatch()로 action obj를 리턴하는 action creator 함수를 보내는데! React와 결합할 경우 React-Redux 라이브러리에서 제공되는 connect()를 사용하기.
- Store 안에서 Data State와 UI State 는 분리해야 한다.
