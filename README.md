## sharepoint-react-app-boilerplate

A SharePoint App boilerplate for creating React apps

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and enhanced with the following:

- [TypeScript](https://www.typescriptlang.org/) - Static type checking.
- [sp-rest-proxy](https://github.com/koltyakov/sp-rest-proxy) - Provides a proxy to a SharePoint environment for live testing.
- [prettier](https://prettier.io/) - Why lint when you can auto-fomat your code?
- [craco](https://github.com/sharegate/craco) - A package created by the ShareGate team to allow configuring CRA without ejecting.
- [husky](https://github.com/typicode/husky) - Hooks git to perform custom tasks on pre-commit.
- [nock](https://github.com/nock/nock) - Allows for mocking REST endpoints for end-to-end testing without a live backend.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test-coverage`

Launches the test runner in coverage mode to generates and display code coverage.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Commit hooks

On pre-commit this boilerplate will:

1. Execute prettier to ensure code format consistency
2. Execute unit-tests to ensure >80% code coverage.

if either of the above fail, the commit will not succeed.

## Suggested VSCode Extensions

The `jest` extension will allow for interactive debugging when executing unit tests (?)
