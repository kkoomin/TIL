# Storage

> Refresh를 해도 UI 상의 데이터를 유지할 때 필요한 개념

### Session Storage

- 세션이 유지될 때까지만 저장되는 공간 (탭이나 페이지를 닫으면 사라짐)

### Local Storage

- 우리가 clear 할 때까지 저장되는 공간 (윈도우나 브라우저를 닫아도 유지됨)
- `setItem()`으로 설정, `getItem()`으로 불러오기
- `JSON.stringify()`로 json 형태를 string으로 변환해서 저장해야함.
- 그리고 다시 string을 json 형태로 재변환할 땐, `JSON.parse()`

* 둘다 Window Object에 내장되어 있음
