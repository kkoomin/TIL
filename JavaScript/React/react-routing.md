# Routing in React

[React Router](https://reacttraining.com/react-router/web/guides/quick-start)

`npm install react-router-dom`

### Primary Components

1. Routers, like <BrowserRouter> and <HashRouter>
2. Route matchers, like <Route> and <Switch>
3. Navigation, like <Link>, <NavLink>, and <Redirect>

- Route

  - `<Route exact path="/somewhere" component={SOMETHING} />`
  - `<Route>` only passes its one child in. So, if you want to use the history of this route, you have to pass the history as a prop down to another child component.  
    -> to AVOID this PROP DRILLING, use `withRouter` (Higher Order Component)

* The component will get three props by default with Route.

  1. history
     - `push`: This can work similar with `<Link>`
       - ex) `<button onClick={()=> props.history.push("/user")}User</button>>`
  2. location
     - Where we are currently in
     - `pathname`: Gives us the full path name (url)
  3. match
     - `params`: object of url parameters (ex. "/:id").
       - In the Component, it can be passed as `props.match.params.id`
     - Allow us to use nested route structure (Dynamic routing)
       - ex) `<Link to={'${props.match.url}/13}'}>13</Link>`

* Switch
  - only renders something match the path, just that one
  - ```js
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/user" component={UserPage} />
      <Route path="/user/:id" component={UserDetail} />
    </Switch>
    ```
* Link

  - `<Link to="/user">User</Link>`
  - For navigation, Link works like a tag and href
  - This is not an actual 'redirect', but make it re-render.

* withRouter
  - HOC (Higher Order Component) : function which takes component as an argument, and returns a modified component.
  - `<Route>`에 걸리지 않은 하위 컴포넌트더라도 `export default withRouter(<COMPONENT NAME>)`으로 컴포넌트를 감싸고, prop으로 history를 받아서 사용할 수 있음.
  - ex) `<div onClick={()=> history.push('${match.url/${URLNAME}}')}>`

### Sample Code

```js
<!-- App.js -->
<HashRouter>
  <div className={"main"}>
    <h1>Simple SPA</h1> // title

    <ul className={"header"}> // navs
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/stuff">Stuff</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </ul>

    <div className="content"> // area that each components will be loaded
      <Route exact path="/" component={Home} /> // exact : path should match exactly the route set
      <Route path="/stuff" component={Stuff} />
      <Route path="/contact" component={Contact} />
    </div>
  </div>
</HashRouter>
```
