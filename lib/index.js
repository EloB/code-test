import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { App } from './containers';
import reducer from './reducer';
import './styles/base.less';

const store = createStore(
  reducer,
  global.devToolsExtension && global.devToolsExtension()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
