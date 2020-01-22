# Natours API Building

### What is Express?

- Express is a minimal node.js framework, a higher level of abstraction.
- Express contains a very robust set of features: complex routing, easier handling of requests and responses, middleware, server-side rendering, etc.
- Express allows for rapid development of node.js applications: we don't have to re-invent the wheel.
- Express makes it easier to organize our application into the MVC architecture.

### Postman

- Tool for doing API testing
- Send the requests and receive the responses as text.

### API

- Application Programming Interface: a piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

### REST Architecture

- Representational States Transfer: A way of building web APIs in a logical way, making them easy to consume.

1. Separate API into logical resources
   - **Resource** : Object or representation of something, which has data associated to it. Any information that can be **named** can be a resource. (Data set that is returned by a request)
2. Expose structured, resource-based URLs
   - ex) https://www.natours.com/addNewTour
   * Endpoint : which will send different data back to the client or perform different actions. (URL that is used to make a request)
3. Use HTTP methods (verbs)
   - HTTP methods : GET POST PUT PATCH DELETE
   - CRUD operations: Create Read Update Delete
   - Endpoints should contain **only resources**(nouns), and use **HTTP methods** for actions.
   - ex) /addNewTour -> POST /tours
4. Send data as JSON (usually)
   - **JSON** is a very lightweight data interchange format which is heavily used by web APIs coded in any programming language.
   - Way of response formatting : Jsend, etc...
5. Be stateless!
   - **Stateless RESTful API**: All state is handled on the **client**. This means that each request must contain all the information necessary to process a certain request. The server should **not** have to remember previous requests.
   - **State** refers to a piece of data in the application that might change over time. ex) loggedIn, currentPage..

### Project

- Express ^4.xx.xx (`npm i express@4`)
- `app.js`: convention to have all the Express configuration
- Routing: to determine how an application responds to a certain client request, so to a certain URL or HTTP request which is used for that request.
- Express sends the headers (ex. Content-type..) automatically :D

### Middleware and Request-Response Cycle

- Express app receives a request when someone hits a server for which it will then create a request object and response object.
- **Middle ware** : manipulate the request or the response object or execute any other code. (Mostly about the request)
- "Everything is middleware" (even routers)
- Middleware Stack
  - Its order is defined by the **order as defined in the code**
  - Just like a pipeline where our data go through (linear process)
  - Request-Response cycle: `incoming request` ---`Middleware stack`---`response`
