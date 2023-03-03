// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { ToastContainer } from 'react-toastify';
import history from 'src/utils/history';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { ProgressBarStyle } from './components/ProgressBar';
import ScrollToTop from './components/ScrollToTop';
import ThemeSettings from './components/settings';
import configureStore from './store/configureStore';

// ----------------------------------------------------------------------

const initialState = {};
export const store = configureStore(initialState, history);

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </ThemeSettings>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MotionLazyContainer>
  );
}
