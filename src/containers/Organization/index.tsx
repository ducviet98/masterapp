import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Mui
import {
  Add as AddIcon,
  PersonAddAlt as PersonAddAltIcon
} from '@mui/icons-material';
import {
  Button, Card, Container, IconButton, Link, MenuItem, Tooltip, Typography
} from '@mui/material';
// Component
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page';
import { TableComp } from 'src/components/table';
import { path } from 'src/constants/path';
import Toolbar from 'src/containers/Certificates/components/Toolbar';
import useHandleDataTable from 'src/hooks/useHandleTable';
import { usePagination } from 'src/hooks/usePagination';
import useSettings from 'src/hooks/useSettings';
import cookie from 'src/utils/cookie';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { MenuAction } from '../Certificates/components/MenuAction';
import ConfirmDelete from './components/ConfirmDelete';
import { FILTER_OPTIONS, headersTable } from './constant';
import { OrganizationMemberType, OrganizationType } from './interface';
import {
  deleteMemberOrganizationRequest, getOrganizationMemberRequest,
  getRoleOrganizationMemberRequest
} from './store/actions';
import reducer from './store/reducers';
import saga from './store/sagas';
import {
  makeSelectIsLoadingOrganization, makeSelectOrganization,
  makeSelectOrganizationMember,
  makeSelectRoleOrganizationMember, makeSelectTotalOrganization
} from './store/selectors';
import InviteMember from './views/InviteMember';

const OrganizationContainer = () => {
  useInjectReducer({ key: 'organization', reducer });
  useInjectSaga({ key: 'organization', saga });

  const isLoading: boolean = useSelector(makeSelectIsLoadingOrganization());
  const total: number = useSelector(makeSelectTotalOrganization());
  const organizationMember: OrganizationMemberType[] = useSelector(makeSelectOrganizationMember());
  const roleUser: [] = useSelector(makeSelectRoleOrganizationMember());
  const organization: OrganizationType[] = useSelector(makeSelectOrganization());

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenModalInvite, setIsOpenModalInvite] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const currentOrganizations = cookie.getCookie('current_organizations');

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

  const { selectAllTable, selectItemTable, handleEdit, selectedItems } =
    useHandleDataTable({
      dataTable: organizationMember,
    });

  const handleToggleModalDelete = () => {
    if (selectedItems?.length >= organizationMember?.length) {
      return setIsOpenDeleteModal(!isOpenDeleteModal);
    } else {
      return handleDeleteMulti();
    }
  };

  const handleDeleteMulti = () => {
    // dispatch(
    //   deleteMemberOrganizationRequest({
    //     id: selectedItems,
    //     currentOrganizations,
    //     organizationMember,
    //     organization,
    //     userID: row.user,
    //     callback: () => {
    //       navigate('/organization');
    //     },
    //     callbackOrg: () => {
    //       navigate('/organization/new');
    //     },
    //   })
    // );
  };

  const handleDeleteItemRow = (row: OrganizationMemberType) => {
    dispatch(
      deleteMemberOrganizationRequest({
        id: [row.id],
        currentOrganizations,
        organizationMember,
        organization,
        userID: row.user,
        callback: () => {
          dispatch(
            getOrganizationMemberRequest({
              page,
              rowsPerPage,
              search: debouncedSearchTerm,
              ordering: filter || '',
            })
          );

        },
        callbackOrg: () => {
          navigate('/organization/new');
        },
      })
    );
  };

  const handleToggleModal = () => setIsOpenModalInvite(!isOpenModalInvite);

  const renderBodyTable = () =>
    organizationMember?.map((row: OrganizationMemberType) => ({
      id: row.id,
      email: (
        <Link
          component={RouterLink}
          to={`${path.organization}/${row?.id}`}
          variant="subtitle2"
          noWrap
        >
          {row?.email}
        </Link>
      ),
      user: <Typography variant="subtitle2">{row.user}</Typography>,
      created_at: dayjs(row.created_at).format('DD/MM/YYYY'),
      updated_at: dayjs(row.updated_at).format('DD/MM/YYYY'),
      action: (
        <MenuAction>
          <MenuItem onClick={() => handleDeleteItemRow(row)} sx={{ color: 'error.main' }}>
            <Iconify icon={'eva:trash-2-outline'} />
            Delete
          </MenuItem>
          <MenuItem onClick={() => handleEdit(path.organization, row?.id)}>
            <Iconify icon={'eva:edit-fill'} />
            Update
          </MenuItem>
        </MenuAction>
      ),
    }));

  useEffect(() => {
    dispatch(
      getOrganizationMemberRequest({
        page,
        rowsPerPage,
        search: debouncedSearchTerm,
        ordering: filter || '',
      })
    );
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage]);

  useEffect(() => {
    dispatch(
      getRoleOrganizationMemberRequest({
        page: 0,
        rowsPerPage: 10,
        search: '',
        ordering: '',
      })
    );
  }, [dispatch]);

  return (
    <Page title="Organization List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Organization"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Organization', href: '/organization' },
          ]}
          action={
            <>
              <Button
                variant="contained"
                component={RouterLink}
                to={path.createOrganization}
                startIcon={<AddIcon />}
                sx={{ marginRight: 1 }}
              >
                Add Organization
              </Button>
              <Button
                variant="outlined"
                onClick={handleToggleModal}
                startIcon={<PersonAddAltIcon />}
                sx={{ marginRight: 1 }}
              >
                Invite Member
              </Button>
              {/* <Button
                  variant="contained"
                  component={RouterLink}
                  to={path.roleOrganization}
                  startIcon={<ManageAccountsIcon />}
                  sx={{ marginRight: 1 }}
                >
                  Manager Roles
                </Button> */}
            </>
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
            rows={renderBodyTable()}
            columns={headersTable}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={total}
            isLoading={isLoading}
            actionSelect={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleDeleteMulti}>
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        </Card>
      </Container>
      <InviteMember
        openDialog={isOpenModalInvite}
        handleToggleDialog={handleToggleModal}
        rolesOrganizations={roleUser}
        isLoading={isLoading}
      />
      <ConfirmDelete
        openDialog={isOpenDeleteModal}
        handleToggleDialog={handleToggleModalDelete}
        onHandleDelete={handleDeleteMulti}
      />
    </Page>
  );
};

export default OrganizationContainer;
