## sharepoint-react-app-boilerplate

A boilerplate for creating React-based SPAs with SharePoint.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and enhanced with the following:

### UI Components

- [@material-ui/core](https://material-ui.com/) - React components that implement Google's Material Design.

### Frameworks

- [TypeScript](https://www.typescriptlang.org/) - Static type checking.
- [lodash](https://lodash.com/) - A modern JavaScript utility library.
- [moment](https://momentjs.com/) - Parse, validate, manipulate and display dates and times in JavaScript.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.

### SharePoint

- [sp-rest-proxy](https://github.com/koltyakov/sp-rest-proxy) - Provides a proxy to a SharePoint environment for live testing.
- [@pnp/js](https://github.com/pnp/pnpjs) - Fluent JavaScript API for consuming SharePoint and Office 365 REST APIs with TypeScript support.

### Unit Testing

- [husky](https://github.com/typicode/husky) - Hooks git to perform custom tasks on pre-commit.
- [nock](https://github.com/nock/nock) - Allows for mocking REST endpoints for end-to-end testing without a live backend.
- [enzyme](https://airbnb.io/enzyme/) - JavaScript testing utility for React that makes it easier to assert, manipulate and traverse React components.

### Other

- [craco](https://github.com/sharegate/craco) - A package created by the ShareGate team to allow configuring CRA without ejecting.
- [prettier](https://prettier.io/) - Why lint when you can auto-fomat your code?

## Getting Started

##### Prerequisites

To start developing with sharepoint-react-app-boilerplate you'll need a few things: First, make sure you've got a recent version of node.js and git installed.
It's suggested that yarn be used instead of npm. Install yarn with `npm install -g yarn`

I also recommend VSCode as an editor, but feel free to use whatever editor suits your fancy.

##### Clone and Install Dependencies

Next, you'll need to clone the sp-angular-webpack repository and install its dependencies.

```bash
# clone the repo
$ git clone -o sharepoint-react-app-boilerplate -b master --single-branch https://github.com/beyond-sharepoint/sharepoint-react-app-boilerplate/ my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install
```

##### Develop

Simply execute `$ npm start` to start a local development webserver. The first time it runs, it will prompt for your SharePoint environment and login. Now modify the files in your editor as needed!

To reset the SharePoint configuration, simply delete the 'sp-rest-proxy' folder and re-run npm start, it will once again prompt for configuration.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test-coverage`

Launches the test runner in coverage mode to generates and display code coverage.

### `yarn test-debug`

When used in conjunection with VSCode, runs unit tests in debug mode, stopping at breakpoints and interactively debugged through the IDE.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run deploy`

Builds and deploys the app to a /sp-app document library contained in the configured SharePoint web.
Configure the desired target document library by editing the corresponding line in package.json.

## Commit hooks

On pre-commit this boilerplate will:

1. Execute prettier to ensure code format consistency
2. Execute unit-tests to ensure >80% code coverage.

if either of the above fail, the commit will not succeed.

## Suggested VSCode Extensions

- `TSLint` - Integrates TSLint with VSCode

## Optional Extensions

- `debugger-for-chrome` debug browser apps running in Chrome via VSCode without leaving VSCode
