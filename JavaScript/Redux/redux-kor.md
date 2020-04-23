# Redux

## 메모

- 리덕스의 Provider를 사용할 땐 최상위 js, 즉 index.js에서 하기 (여기서 BrowserRoute도 설정)
- Redux 폴더를 만들어서 기능별로 하위 폴더 안에 action, action type, reducer를 정의하고, root-reducer.js에서 combineReducers() 실행 후 export
- store.dispatch()로 action obj를 리턴하는 action creator 함수를 보내는데! React와 결합할 경우 React-Redux 라이브러리에서 제공되는 connect()를 사용하기.
- Store 안에서 Data State와 UI State 는 분리해야 한다.
