import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from 'redux-starter-kit';
import { Provider } from 'react-redux';
import widgetEditor from './slices/WidgetEditorSlice';
import './index.css';
import App from './App';

const store = configureStore({
  reducer: {
    widgetEditor,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
