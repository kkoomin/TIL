# React

> Ref. [React official Docs](https://reactjs.org/docs/getting-started.html), [Complete React Developer in 2020](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/)

### React Concepts

1. Don't touch the DOM. React will do it
2. Build websites like Lego blocks (with Components)
3. Unidirectional data flow (parent->child)
4. UI, the rest is up to you.

### The Job Of a React Developer

1. Decide on Components
2. Decide the State and where it lives
3. What charges when state changes

### Why do we break things down into components?

- Flexibility of performance
- Easy to test
- We can combine each component with its concern.

### State vs Props

- One way data flow (need to Lifting State Up)
- `State` lives in just one location and it trickles down as `props`

cf. `key` attribute: to distinguish when multiple components are rendered one after another.

- `setState` is an asynchronous function call. So we need to use call back function if we want to run certain function right after setState is done. `setState(updater[, callback])`

### Component

- `functional Component` : just a component that gets some props and returns some HTML. (No internal states, life cycle methods...)

  ```js
  export const SearchBox = ({ placeholder, handleChange }) => (
    <input
      className="search"
      type="search"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
  ```

- `class Component`

  - `this` : In JS, it references the context in which it's being invoked. (It matters when it comes to arrow functions and binding in React.)
  - Use arrow functions on any class methods you define and aren't part of React (i.e. render(), componentDidMount()).

- `Portal`: Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

  ```js
  class Header extends React.Component {
    render() {
      return ReactDOM.createPortal(
        this.props.title,
        document.querySelector("<somewhere>")
      );
    }
  }
  ```

### Event

- `Synthetic Event` : a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers.
- https://reactjs.org/docs/events.html

- `Event Pooling`
  - Event pooling means that whenever an event fires, its event data (an object) is sent to the callback. The object is then immediately cleaned up for later use. This is what we mean by 'pooling': the event object is in effect being sent back to the pool for use in a later event. It's something that trips up a lot of people, and you might have run into it yourself when inspecting SyntheticEvent in the browser. [Learn.co](https://learn.co/lessons/react-events-in-detail)
  - If we want to access to the event data,
    1. store the data in the local variable
    2. use `event.persist()`

### Deploy

(Use github website to deploy static website for free)

- `yarn add gh-pages`
- In `package.json`, add `"homepage": "https://<github username>.github.io/<project name>`
- Add in `"scripts": { "predeploy": "yarn build", "deploy": "gh-pages -d build" }`
- Find the link in github repository settings

### Lifecyle Methods

[Lifecyle method diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- Mounting

  - When the component is being put on the DOM for the first time. (after rendering)
  - Once it's mounted, `componentDidMount`

- Updating

  - New props, setState(), forceUpdate() will cause the component to go into the updating phase. (Doesn't need to be 'mount' again.)
  - After update and re-render, `componentDidUpdate`
  - `shouldComponentUpdate` : determines if the whole chain needs to happen. (returns boolean)
    - Mainly just for performance
    ```js
    shouldComponentUpdate(nextProps, nextState) {
      <.. determine whether or not go through other life cycle methods(inc. re-rendering) ..>
      return nextProps.text !== this.props.text;
    }
    ```

- Unmounting
  - `componentWillUnmount`
    - Use when we want to remove anything that might be a memory leak.

### Routing

- Instll router library : `npm i react-router-dom`
- Sample Code:

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
