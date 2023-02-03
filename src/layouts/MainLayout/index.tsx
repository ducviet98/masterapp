import { Box, CssBaseline, Drawer, Toolbar, useMediaQuery } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React from 'react';

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import Header from './Header';
import Navbar from './Navbar';
import saga from 'src/containers/Auth/login/store/sagas'
import reducer from 'src/containers/Auth/login/store/reducer'
import { useStyles } from './styles';
// import breakpoints from 'src/theme/breakpoints'
import { useTheme } from '@mui/material/styles';
import useResponsive from 'src/hooks/useResponsive';

export const drawerWidth = 240;

interface Props {
  children: React.ReactNode
}

function Layout(props: Props) {
  const clx = useStyles();
  const theme = useTheme();
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer })

  const { children } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isMobile = useResponsive('down', 'sm');

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header matches={isMobile} handleDrawerToggle={handleDrawerToggle} />
      {
        !isMobile && <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: {
                xs: 'none',
                sm: 'block'
              },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
              },
            }}
            open
          >
            <Navbar />
          </Drawer>
        </Box>
      }
      <Drawer
        anchor='left'
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Navbar />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1, p: 3,
          width: { sm: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)` },
        }}
        className={clx.mainContainer}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
