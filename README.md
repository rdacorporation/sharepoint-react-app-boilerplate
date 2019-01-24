## sharepoint-react-app-boilerplate

An opinionated boilerplate for creating React-based SPAs utilizing TypeScript that are backed by SharePoint REST services.

This boilerplate facilitates the creation of apps that _integrate_ rather than _extend_ SharePoint. With it you can create stand-alone applications, fully-branded experiendes, RPAs and tools that utilize SharePoint as a data source.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and enhanced with the following modules to get started building a full-page SharePoint app as easy as possible.

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
- [sp-pnp-node](https://github.com/koltyakov/sp-pnp-node#readme) - Provides an easy way to use @pnp/js from node with support of various authentication strategies.

### Unit Testing

- [husky](https://github.com/typicode/husky) - Hooks git to perform custom tasks on pre-commit.
- [nock](https://github.com/nock/nock) - Allows for mocking REST endpoints for end-to-end testing without a live backend.
- [enzyme](https://airbnb.io/enzyme/) - JavaScript testing utility for React that makes it easier to assert, manipulate and traverse React components.

### Other

- [craco](https://github.com/sharegate/craco) - A package created by the ShareGate team to allow configuring CRA without ejecting.
- [prettier](https://prettier.io/) - Why lint when you can auto-fomat your code?
- [babel-polyfill](https://github.com/babel/babel/tree/master/packages/babel-polyfill) - Polyfills for non-modern browsers.
- [fetch](https://github.com/github/fetch#readme) - Fetch support for non-modern browsers.

## Getting Started

##### Prerequisites

To start developing with sharepoint-react-app-boilerplate you'll need a few things: First, make sure you've got a recent version of node.js and git installed.

It is suggested that yarn be used instead of npm. Install yarn with `npm install -g yarn`

I also recommend VSCode as an editor, but feel free to use whatever editor suits your fancy.

##### Clone and Install Dependencies

Next, you'll need to clone the sharepoint-react-app-boilerplate repository and install its dependencies.

```bash
# clone the repo
$ git clone -o sharepoint-react-app-boilerplate -b master --single-branch https://github.com/beyond-sharepoint/sharepoint-react-app-boilerplate/ my-app

# change directory to your app
$ cd my-app

# install the dependencies with yarn
$ yarn install
```

##### Develop

Simply execute `$ yarn start` to start a local development webserver.

The first time the application runs, it will prompt for your SharePoint environment url and login in order to seamlessly connect to your SharePoint environment

To reset the SharePoint configuration, simply delete the 'sp-rest-proxy' folder and re-run `yarn start`, it will once again prompt for configuration.

Now, modify the files in your editor as needed!

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

if the above fails, the commit will not succeed.

> Note: Previous versions of this boilerplate also executed unit tests to ensure a standard of code coverage.
> In practice, this hindered rather than helped development by reducing commits
> If code-coverage on commit is desired, add `test-ci` to the husky pre-commit hook in package.json

## Suggested VSCode Extensions

- `TSLint` - Integrates TSLint with VSCode
- `debugger-for-chrome` - debug browser apps running in Chrome via VSCode without leaving VSCode
- `jest` - auto-runs unit tests and shows code coverage
- `Wallaby.js` - Continuous testing tool for JavaScript (payware)

## FAQ

- Why would I use sp-react-app over SharePoint Framework (SPFx)?

If you're _extending_ SharePoint through webparts, application customizers, field customizers, or command sets, SPFx is the choice for you.

If you're _integrating_ SharePoint by treating it as a headless CMS, building apps, RPAs, or tools that interact with SharePoint that are hosted either within or outside of SharePoint, providing a fully-branded experience with SharePoint as the backend without wanting to pay the SharePoint branding tax, or composing an application that utilizes SharePoint data in addition to other external services, sp-react-app facilitates these use cases.

- Can I build a docker container that hosts my application?

Yes. The scripts to do so are part of this boilerplate.

`yarn docker-build`
`yarn docker-run`

If building a container that runs in a production environment, you may want to configure the dockerfile to run a streamlined express server behind an nginx proxy rather than the currently configured webpack development server.

> Note: sp-rest-proxy encrypts credentials with a local machine key, ensure that the sp-rest-proxy options set to `encryptPassword: false` or supply desired credentials via environment variables.

Be wary of the SharePoint REST endpoint limits. You may want to provide a caching layer in between the app and SharePoint to minimize SharePoint traffic (outside the scope of this project).

- Is it possible to have a site created with sp-react-app hosted outside of SharePoint, that uses an app account to retrieve content? (NodeJS-based Provider Hosted App using App Credentials)

Yes, the recommended approach to doing so is:

1. Create your app credentials by visiting `https://<your tenant>/_layouts/15/appregnew.aspx`. Record the client id and secret.
2. Modify the app permission level by visiting `https://<your tenant>/_layouts/15/appinv.aspx` and supplying the desired permissions xml and by creating and trusting it on the same page.
3. Remove any already-configured authentication by removing the `sp-rest-proxy` folder. Utilize the app credentials by running `yarn start` and supplying the client id and secret recorded in step 1.
4. Develop your application.
5. Follow the steps above to build a docker container and host on container hosting services such as DigitalOcean, Azure App Service for Containers or AKS.

- Can I deploy my application that I created with sp-react-app via a SharePoint app?

Yes - this has been done with this boilerplate.

The general strategy is:

1. Build your app using this boilerplate.
2. Run `yarn build`
3. Take the files contained in the ./build folder and add them to a Visual Studio (full) based SharePoint App project.
4. Build and deploy the app with Visual Studio.

These steps can be performed as part of a CI/CD process by dynamically generating a .csproj and inserting the files contained in the ./build folder. This has been done before with this boilerplate, but we currently don't provide the generator project, scripts or template to do so.

- Can I use sp-react-app as part of an Azure DevOps build pipeline?

Yes, a sample azure-pipelines.yml file is part of this boilerplate. The 'Yarn' Azure DevOps extension is required.

- Can I use Office UI Fabric instead of Material Design?

Yes, simply remove the material design package and add office ui fabric

`yarn remove @material-ui/core @material-ui/icons`
`yarn add office-ui-fabric-react`

- I'm more familiar with Bootstrap for styling, how do I use Bootstrap instead of Material Design?

Remove material ui and add bootstrap

`yarn remove @material-ui/core @material-ui/icons`
`yarn add bootstrap reactstrap`

- How do I upgrade the packages within my app?

I highly recommend [npm-check-updates](https://github.com/tjunnone/npm-check-updates). Install with `yarn install -g npm-check-updates` and run with `ncu` in your project folder.

- Can I use sp-react-app with custom REST services?

I would recommend to use sp-react-app within a mono-repo approach that also contains your custom REST services.
