import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
// Mui
import { Button, Grid, Typography, Container, Stack, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
// Components

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableComp } from 'src/components/table';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { usePagination } from 'src/hooks/usePagination';
import Label from 'src/components/Label';

import reducer from './store/reducers';
import saga from './store/sagas';
import {
  makeSelectIsLoadingManagerRole,
  makeSelectErrorManagerRole,
  makeSelectTotalManagerRole,
  makeSelectPermission,
  makeSelectRoles,
} from './store/selectors';
import { getPermissionRequest, getRoleRequest } from './store/actions';
import { ManagerRolesType, rolesType } from './interface';
import { headersTable } from './constants';
import AddRoleComp from './Components/AddRoleComp';

const ManagerRoles = ({ isLoading, total, permissions, roles }: ManagerRolesType) => {
  const [isOpenModalAddRole, setIsOpenModalAddRole] = useState<boolean>(false);

  useInjectReducer({ key: 'managerRole', reducer });
  useInjectSaga({ key: 'managerRole', saga });

  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { debouncedSearchTerm, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const handleToggleModalAddRole = () => setIsOpenModalAddRole(!isOpenModalAddRole);

  useEffect(() => {
    dispatch(getPermissionRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getRoleRequest({
        page: 10,
      })
    );
  }, [dispatch]);

  return (
    <Page title="MFI Token List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Manager Roles"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Manager Roles', href: '/manager-role' },
          ]}
          action={
            <Button variant="contained" onClick={handleToggleModalAddRole} startIcon={<AddIcon />}>
              Add Roles
            </Button>
          }
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableComp
              rows={renderBodyTable(roles)}
              columns={headersTable}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              count={total}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Container>
      <AddRoleComp openDialog={isOpenModalAddRole} handleToggleDialog={handleToggleModalAddRole} />
    </Page>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingManagerRole(),
  total: makeSelectTotalManagerRole(),
  permissions: makeSelectPermission(),
  roles: makeSelectRoles(),
});

const renderBodyTable = (data: rolesType[]) =>
  data?.map((row: any) => ({
    id: row.id,
    name: (
      <Typography variant="subtitle2" textAlign="center" noWrap>
        {row?.name}
      </Typography>
    ),
    permissions: (
      <Box sx={{ maxWidth: 1000, display: 'flex', flexWrap: 'wrap' }}>
        {row?.permissions.map((item: any) => (
          <Label key={item} color="success" sx={{ textTransform: 'capitalize', m: 0.5 }}>
            {item}
          </Label>
        ))}
      </Box>
    ),

    created_at: dayjs(row?.created_at).format('MM-DD-YY h:mm A'),
    updated_at: dayjs(row?.updated_at).format('MM-DD-YY h:mm A'),
  }));

export default connect(mapStateToProps)(ManagerRoles);
