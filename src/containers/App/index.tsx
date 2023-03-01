// routes
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import { ProgressBarStyle } from 'src/components/ProgressBar';
import ScrollToTop from 'src/components/ScrollToTop';
// components
import ThemeSettings from 'src/components/settings';
import Router from 'src/routes/index';
// theme
import ThemeProvider from 'src/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// App component
function App() {
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
