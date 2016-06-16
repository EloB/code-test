import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { App } from './containers';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducer from './reducer';
import './styles/base.less';

injectTapEventPlugin();

const store = createStore(
  reducer,
  global.devToolsExtension && global.devToolsExtension()
);

const mount = document.getElementById('mount');

const renderApp = Component => {
  const root = (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <Component />
      </Provider>
    </MuiThemeProvider>
  );
  if (module.hot) {
    const AppContainer = require('react-hot-loader').AppContainer; // eslint-disable-line
    return <AppContainer children={root} />;
  }
  return root;
};

render(renderApp(App), mount);

if (module.hot) {
  module.hot.accept(['./containers', './components'], () => {
    const NextApp = require('./containers/App').default; // eslint-disable-line
    render(renderApp(NextApp), mount);
  });

  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default; // eslint-disable-line
    store.replaceReducer(nextRootReducer);
  });
}
