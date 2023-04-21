/* eslint-disable */
// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { Provider } from 'react-redux';

//
import App from 'src/containers/App/index';
import configureStore from './store/configureStore';
import { OrganizationProvider } from 'src/components/OrganizationProvider';

// ----------------------------------------------------------------------

const initialState = {};
const store = configureStore(initialState, history);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <OrganizationProvider>
      <HelmetProvider>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </HelmetProvider>
    </OrganizationProvider>
  </Provider>
);
