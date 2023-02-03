import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import App from './containers/App';
import history from './utils/history';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import './index.css';


const initialState = {};
const { PUBLIC_URL } = process.env;
const store = configureStore(initialState, history);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App basename={PUBLIC_URL} />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
