import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import { sp } from "@pnp/sp";

// let baseUrl: string | undefined = undefined;
// if (process.env.NODE_ENV !== 'production') {
//     baseUrl = 'http://localhost:3001';
// }

// sp.setup({
//   sp: {
//     headers: {
//       "Accept": "application/json;odata=verbose"
//     },
//     baseUrl
//   }
// });

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
