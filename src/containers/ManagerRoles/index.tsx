import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import dayjs from 'dayjs';
// Mui
import {
  Button,
  Typography,
  Container,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
  Card,
} from '@mui/material';
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
import useHandleDataTable from 'src/hooks/useHandleTable';
import Toolbar from 'src/containers/Certificates/components/Toolbar';

import reducer from './store/reducers';
import saga from './store/sagas';
import {
  makeSelectIsLoadingManagerRole,
  makeSelectTotalManagerRole,
  makeSelectPermission,
  makeSelectRoles,
} from './store/selectors';
import { deleteRoleRequest, getPermissionRequest, getRoleRequest } from './store/actions';
import { IManagerRoles, RolesType } from './interface';
import { FILTER_OPTIONS, headersTable } from './constants';
import AddRoleComp from './Components/AddRoleComp';
import Iconify from 'src/components/Iconify';
import { MenuAction } from '../Certificates/components/MenuAction';

const ManagerRoles = ({ isLoading, total, permissions, roles }: IManagerRoles) => {
  useInjectReducer({ key: 'managerRole', reducer });
  useInjectSaga({ key: 'managerRole', saga });

  const [isOpenModalAddRole, setIsOpenModalAddRole] = useState<boolean>(false);
  const [roleDetail, setRoleDetail] = useState<RolesType | null>(null);

  const dispatch = useDispatch();
  const { themeStretch } = useSettings();
  
  const {
    debouncedSearchTerm,
    page,
    rowsPerPage,
    search,
    filter,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearch,
    handleFilter,
  } = usePagination();

  const handleToggleModalAddRole = () => setIsOpenModalAddRole(!isOpenModalAddRole);

  const { selectAllTable, selectItemTable, setSelectedItems, selectedItems } = useHandleDataTable({
    dataTable: roles,
  });

  const handleDelete = (id?: number) => {
    dispatch(
      deleteRoleRequest({
        ids: id ? [id] : selectedItems,
        callback: () => {
          setSelectedItems([]);
        },
      })
    );
  };

  const handleOpenModalUpdate = (row: RolesType) => setRoleDetail(row);

  const handleCloseRoleDetail = () => setRoleDetail(null);

  useEffect(() => {
    dispatch(getPermissionRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getRoleRequest({
        page,
        rowsPerPage,
        search: debouncedSearchTerm,
        ordering: filter,
      })
    );
  }, [dispatch, page, rowsPerPage, debouncedSearchTerm, filter]);

  return (
    <>
      <Page title="MFI Token List">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Manager Roles"
            links={[
              { name: 'Dashboard', href: '/' },
              { name: 'Manager Roles', href: '/manager-role' },
            ]}
            action={
              <Button
                variant="contained"
                onClick={handleToggleModalAddRole}
                startIcon={<AddIcon />}
              >
                Add Roles
              </Button>
            }
          />
          <Card>
            <Toolbar
              search={search}
              filter={filter}
              onSearch={handleSearch}
              onFilter={handleFilter}
              optionsRole={FILTER_OPTIONS}
            />
            <TableComp
              selectItemTable={selectItemTable}
              selectAllTable={selectAllTable}
              selectedItems={selectedItems}
              isSelect
              rows={renderBodyTable(roles, handleDelete, handleOpenModalUpdate)}
              columns={headersTable}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              count={total}
              isLoading={isLoading}
              actionSelect={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={() => handleDelete()}>
                    <Iconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </Tooltip>
              }
            />
          </Card>
        </Container>
      </Page>
      <AddRoleComp openDialog={isOpenModalAddRole} handleToggleDialog={handleToggleModalAddRole} />
      <AddRoleComp
        openDialog={!!roleDetail?.id}
        handleToggleDialog={handleCloseRoleDetail}
        roleDetail={roleDetail}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingManagerRole(),
  total: makeSelectTotalManagerRole(),
  permissions: makeSelectPermission(),
  roles: makeSelectRoles(),
});

export default connect(mapStateToProps)(ManagerRoles);

const renderBodyTable = (
  data: RolesType[],
  handleDelete: (id: number) => void,
  handleOpenModalUpdate: (row: RolesType) => void
) =>
  data?.map((row: RolesType) => ({
    id: row.id,
    name: (
      <Typography variant="subtitle2" textAlign="center" noWrap>
        {row?.name}
      </Typography>
    ),
    permissions: (
      <Box sx={{ maxWidth: 1000, display: 'flex', flexWrap: 'wrap' }}>
        {row?.permissions.map((item: string) => (
          <Label key={item} color="success" sx={{ textTransform: 'capitalize', m: 0.5 }}>
            {item}
          </Label>
        ))}
      </Box>
    ),
    created_at: dayjs(row?.created_at).format('MM-DD-YY h:mm A'),
    updated_at: dayjs(row?.updated_at).format('MM-DD-YY h:mm A'),
    action: (
      <MenuAction>
        <MenuItem onClick={() => handleDelete(row?.id)} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} />
          Delete
        </MenuItem>
        <MenuItem onClick={() => handleOpenModalUpdate(row)}>
          <Iconify icon={'eva:edit-fill'} />
          Update
        </MenuItem>
      </MenuAction>
    ),
  }));
