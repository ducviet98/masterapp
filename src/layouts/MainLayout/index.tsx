import { Box, CssBaseline, Drawer, Toolbar } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import Header from './Header';
import Navbar from './Navbar';
import saga from 'src/containers/Auth/store/sagas';
import reducer from 'src/containers/Auth/store/reducer';
import useResponsive from 'src/hooks/useResponsive';

import { useStyles } from './styles';

export const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const clx = useStyles();
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'auth', reducer });
  const isDesktop = useResponsive('up', 'md');

  const { children } = props;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        matches={!isDesktop}
        handleDrawerToggle={() => handleDrawerToggle()}
      />
      {isDesktop && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
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
      )}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => handleDrawerToggle()}
      >
        <Navbar />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: isDesktop ? '100%' : `calc(100% - ${drawerWidth}px)` },
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
