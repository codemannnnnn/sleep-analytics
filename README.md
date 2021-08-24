## Hello!

### Thank you for viewing my repo, this project includes a build that contains a UI built in React to display user data for sleep sessions.

### Tech Stack

React | Recoil | Chart.js | Reactstrap | Docker

## Run the app on your local machine.

I have included a built Dockerfile to handle the build for you.

Commands to run once you have cloned to your machine

    ####Docker Build
    docker build -t eight-sleep-app .

    ####Run the newly created image
    docker run -d --name "eight-sleep-analytics" -p 3000:3000 eight-sleep-app

Go to http://localhost:3000 to view the UI.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
