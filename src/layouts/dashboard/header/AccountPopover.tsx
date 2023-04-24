import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Avatar, Box, Divider, MenuItem, Stack, Typography, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import CookieHandlerInstance from 'src/utils/cookie';
import reducer from 'src/containers/Auth/store/reducer';
import saga from 'src/containers/Auth/store/sagas';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { logoutRequest } from 'src/containers/Auth/store/actions';
import reducerOrganization from 'src/containers/Organization/store/reducers';
import sagaOrganization from 'src/containers/Organization/store/sagas';
import { makeSelectOrganization } from 'src/containers/Organization/store/selectors';
import { OrganizationType } from 'src/containers/Organization/interface';
import { switchOrganizationRequest } from 'src/containers/Organization/store/actions';

import { IconButtonAnimate } from '../../../components/animate';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: '/',
  },
  {
    label: 'Settings',
    linkTo: '/',
  },
];

interface IProps {
  organization: [OrganizationType];
}
// ----------------------------------------------------------------------

const AccountPopover = (props: IProps) => {
  const { organization } = props;
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });
  useInjectReducer({ key: 'organization', reducer: reducerOrganization });
  useInjectSaga({ key: 'organization', saga: sagaOrganization });
  const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const handleSwitchOrganizations = (item: OrganizationType) => {
    dispatch(
      switchOrganizationRequest({
        id: item.id,
        callback: () => {
          navigate('/');
        },
      })
    );
    handleClose();
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
          alt="Rayan Moran"
        />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Rayan Moran
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            rayan.moran@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem component={Link} to="/organizations/all" onClick={handleClose} role="button">
            <ListItemText primary="My Organizations" />
          </MenuItem>

          <Stack>
            {organization?.map((item: OrganizationType) => (
              <MenuItem
                key={item?.id}
                role="button"
                onClick={() => handleSwitchOrganizations(item)}
                selected={+item.id === +currentOrganizations}
              >
                {item.name}
              </MenuItem>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
});

export default connect(mapStateToProps)(AccountPopover);
