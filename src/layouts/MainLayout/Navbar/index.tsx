import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  AccountBox as AccountBoxIcon,
} from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { path } from 'src/constants/path';

import { useStyles } from './styles';

const MenuHeader = [
  {
    title: 'Dashboard',
    path: path.home,
    icon: <HomeIcon />,
  },
  {
    title: 'User Device',
    path: path.userDevice,
    icon: <AccountBoxIcon />,
  },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Box
          component="img"
          src="/logo/logo_single.svg"
          sx={{ width: 40, height: 40, cursor: 'pointer' }}
        />
      </div>
      <List className={classes.list}>
        {MenuHeader?.map((item, index) => (
          <ListItem
            className={clsx(classes.listItem, {
              [classes.itemSelected]: pathname === item.path,
            })}
            component={Link}
            to={item.path}
            key={index}
            disablePadding
            selected={pathname === item.path}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
