import React from 'react';
import { useDispatch } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  Toolbar,
} from '@mui/material';

import { drawerWidth } from '..';
import { logoutRequest } from 'src/containers/Auth/store/actions';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';

import reducer from '../../../containers/Auth/store/reducer';
import saga from '../../../containers/Auth/store/sagas';

import { useStyles } from './styles';

const Header = ({ matches, handleDrawerToggle }) => {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  const classes = useStyles();

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: matches ? '100%' : `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: '#ffff',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <div className={classes.viewHeader}>
          <Button onClick={handleClick}>
            <AccountCircleIcon />
          </Button>
        </div>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          style={{
            borderRadius: 6,
          }}
        >
          <List
            subheader={
              <ListSubheader
                className={classes.listSubHeader}
                component="div"
                id="nested-list-subheader"
              >
                <AccountCircleIcon className={classes.mr4} /> Ducviet
              </ListSubheader>
            }
          >
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
