# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Project Description**<br>
To display an interactive world map which dynamically fetches News Articles and displays them across the map. The user has the flexibility to view the articles, filter articles based on date, and also search for various articles of personal interest. 

**Package Manager** used is **NPM** <br>

**Webpack** module bundler used for managing the JavaScript codebase<br>

**Main JavaScript** Library used for building the front-end is **ReactJS** 
    - The code was modularized into multiple components (React functional and class components), which were created for various functionalities of the project such as filtering and searching articles. 
    - The main App.js renders the front-end while interacting with the various components. 
    - App.js fetches back-end data from the API_BASE_URL: 'https://crypto-volt-345721.et.r.appspot.com/api'

**Interactive Map Framework** used is **Leaflet** | Tiles @Esri 
    - The main base map is intergrated using Leaflet.
    - Various leaflet plugins for the map were also used to integrate functionalities such as - hovering 
    over news article pins (markers and popup), selecting an area of the map by drawing a polygon (react-leaflet-draw), etc..

 **Major 3rd-party library** used for **styling** and front-end design is **Material-UI (@mui/material/...)** 
    - News Article Card components were designed using this library which includes typography,stack, cardactionarea, chip, etc..


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
