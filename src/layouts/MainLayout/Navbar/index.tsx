import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { AccountBox as AccountBoxIcon, Category as CategoryIcon, Home as HomeIcon, Quiz as QuizIcon, SupportAgent as SupportAgentIcon , EditNotifications as EditNotificationsIcon } from '@mui/icons-material';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import { IconLogo } from 'src/components/icons';

import { useStyles } from './styles';


const MenuHeader = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeIcon />
  },
  {
    title: 'Users',
    path: '/users',
    icon: <AccountBoxIcon />
  },
  {
    title: 'Notification',
    path: '/notifications',
    icon: <EditNotificationsIcon />
  },
  {
    title: 'Products',
    path: '/products',
    icon: <CategoryIcon />
  },
  {
    title: 'FAQ',
    path: '/faqs',
    icon: <QuizIcon />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <SupportAgentIcon />
  },
]

export default function Navbar() {

  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {/* <IconLogo /> */}
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
    </>
  );
}



