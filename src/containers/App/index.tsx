// Dependencies
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routes from '../../routes';
import { makeSelectLoading } from './store/selectors';
import ThemeProvider from 'src/utils/theme';

// App component
function App({ basename }: any) {
  return (
    <Fragment>
      <Helmet
        titleTemplate="%s | Domotix BackOffice"
        defaultTitle="Dashboard | Domotix BackOffice"
      ></Helmet>
      <ThemeProvider>{routes}</ThemeProvider>
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
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
