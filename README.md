# WordBook

This is a project still in development. It contains some bugs that will be addressed in the future. This README will be updated soon.

## TODO
    * Add option to create and use accounts
    * Add different learning modes
    * Add color scheme to the app
    * Add documentation
    * Add instructions to run app in production mode + build instructions
    * Add unit tests
    * Add e2e tests
    * Refactor code

## Dependencies
    * MongoDB
    * Angular
    * Express
    * Node.js

## Running the application

Install MongoDB if not already installed (for instructions: https://docs.mongodb.com/manual/administration/install-community/). Set up a database for this app. App uses `backend/data` path for the data by default, but it can be set anywhere. Initialize the database by running `mongod --dbpath ./backend/data` (or path of your choice).

Run `cd backend` and `npm run dev` to turn on the backend in development mode.

Then in another terminal run `cd frontend` and `ng serve --open` to open and run a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files (backend or frontend).
