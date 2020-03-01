# Routing in React

[React Router](https://reacttraining.com/react-router/web/guides/quick-start)

`npm install react-router-dom`

- Route

  - `<Route exact path="/somewhere" component={SOMETHING} />`
  - The component will get three props by default with Route.
    1. history
    2. location
    3. match
       - params: url parameters (ex. "/:id")

- Switch
  - only renders something match the path, just that one
  - ```js
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/user" component={UserPage} />
      <Route path="/user/:id" component={UserDetail} />
    </Switch>
    ```
