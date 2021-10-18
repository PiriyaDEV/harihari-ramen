import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import postReducer from './reducers/postReducer'
const store = createStore(postReducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider >
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
