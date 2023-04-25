import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Mui
import { Button, Container, Card } from '@mui/material';
import {
  Add as AddIcon,
  PersonAddAlt as PersonAddAltIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
// Component
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { TableComp } from 'src/components/table';
import { usePagination } from 'src/hooks/usePagination';
import Toolbar from 'src/containers/Certificates/components/Toolbar';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import cookie from 'src/utils/cookie';
import { path } from 'src/constants/path';

const OrganizationRole = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Page title="Manager roles">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Manager Roles"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Organization', href: '/organization' },
            { name: 'Manager Roles' },
          ]}
          action={
            <>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ marginRight: 1 }}
              >
                Add Roles
              </Button>
            </>
          }
        />
      </Container>
    </Page>
  );
};

export default OrganizationRole;
