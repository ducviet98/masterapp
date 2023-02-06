import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { AccountBox as AccountBoxIcon, Category as CategoryIcon, Home as HomeIcon, Quiz as QuizIcon, SupportAgent as SupportAgentIcon, EditNotifications as EditNotificationsIcon } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
// import { IconLogo } from 'src/components/icons';

import { useStyles } from './styles';


const MenuHeader = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeIcon />
  },
]

export default function Navbar() {

  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div style={{ paddingLeft: 16 }}>
      <div className={classes.root}>
        <Box
          component="img"
          src="/logo/logo_single.svg"
          sx={{ width: 40, height: 40, cursor: 'pointer' }}
        />
      </div>
      <List className={classes.list}>
        {MenuHeader.map((item, index) => (
          <ListItem className={clsx(classes.listItem, {
            [classes.itemSelected]: pathname === item.path
          })} component={Link} to={item.path} key={index} disablePadding selected={pathname === item.path}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}



