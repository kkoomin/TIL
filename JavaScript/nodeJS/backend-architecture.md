# Backend Architecture

### MVC Architecture

(with example project: TIL/JavaScript/nodeJS/4-natours)

1. **MODEL**

   - Business Logic
   - Code that actually solves the business problem we set out to solve.
   - Directly related to business rules, how the business works, and business needs.
   - Examples:
     - Creating new tours in the DB
     - Checking if user's password is correct
     - Validating user input data
     - Ensuring only users who bought a tour can review it

2. **VIEW**

   - Presentation Logic

3. **CONTROLLER**

   - Application Logic
     - Code that is only concerned about the application's implementation, not the underlying business problem we're trying to solve (ex. showing and selling tours).
     - The logic that makes the app actually work.
     - Concerned about managing requests and responses.
     - About the app's more technical aspects.
     - Bridge between model and view layers.

- cf. Fat models / thin controllers : offload as much logic as possible into the models, and keep the controllers as simple and lean as possible.
