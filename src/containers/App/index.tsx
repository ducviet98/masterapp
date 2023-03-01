// routes
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import { ProgressBarStyle } from 'src/components/ProgressBar';
import ScrollToTop from 'src/components/ScrollToTop';
// components
import ThemeSettings from 'src/components/settings';
import reducer from 'src/containers/Auth/store/reducer';
import saga from 'src/containers/Auth/store/sagas';
import Router from 'src/routes/index';
// theme
import ThemeProvider from 'src/theme';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';

// App component
function App() {

  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

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

export default App;
