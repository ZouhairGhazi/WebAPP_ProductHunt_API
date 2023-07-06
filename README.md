# Web application based on the Product Hunt API
A tool connected to the Product Hunt API that allows retrieving products released on a specific date and visualizing them

## Prerequisites
Make sure you have the following software installed on your machine:

* Node.js
* Angular CLI

## Launching the Application

Start the front-end server (Angular):

```
cd .\Front-end\product-hunt_app\
npm install
npm run start
```

Start the back-end server (Node.js):

```
cd .\Back-end\
npm install
node server.js
```

## Building for Production

To build the application for production, follow these steps for the frontend

```
cd .\Front-end\product-hunt_app\
ng build --prod
```

## Configuration

If necessary, update the environment variables in the .env file located in the project root, for both front and backend.
