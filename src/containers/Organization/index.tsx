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

import {
  makeSelectIsLoadingOrganization,
  makeSelectTotalOrganization,
  makeSelectOrganization,
  makeSelectOrganizationMember,
  makeSelectRoleOrganizationMember,
} from './store/selectors';
import reducer from './store/reducers';
import saga from './store/sagas';
import { OrganizationType, OrganizationMemberType } from './interface';
import { FILTER_OPTIONS, headersTable } from './constant';
import { getOrganizationMemberRequest, getRoleOrganizationMemberRequest } from './store/actions';
import InviteMember from './views/InviteMember';

interface organizationType {
  isLoading: boolean;
  total: number;
  organization: [OrganizationType];
  organizationMember: [OrganizationMemberType];
  roleUser: [];
}

const OrganizationContainer = ({
  isLoading,
  total,
  organization,
  organizationMember,
  roleUser,
}: organizationType) => {
  useInjectReducer({ key: 'organization', reducer });
  useInjectSaga({ key: 'organization', saga });
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenModalInvite, setIsOpenModalInvite] = useState<boolean>(false);
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

  const handleChangePageItem = (id: any) => {
    navigate(`/organization/${id}`, id);
  };

  const handleToggleModal = () => setIsOpenModalInvite(!isOpenModalInvite);

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
    <>
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
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={path.roleOrganization}
                  startIcon={<ManageAccountsIcon />}
                  sx={{ marginRight: 1 }}
                >
                  Manager Roles
                </Button>
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
              rows={renderBodyTable(organizationMember)}
              columns={headersTable}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              count={total}
              isLoading={isLoading}
              onChangePage={handleChangePageItem}
            />
          </Card>
        </Container>
      </Page>
      <InviteMember
        openDialog={isOpenModalInvite}
        handleToggleDialog={handleToggleModal}
        rolesOrganizations={roleUser}
        organization_id={currentOrganizations}
        isLoading={isLoading}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingOrganization(),
  total: makeSelectTotalOrganization(),
  organization: makeSelectOrganization(),
  organizationMember: makeSelectOrganizationMember(),
  roleUser: makeSelectRoleOrganizationMember(),
});

export default connect(mapStateToProps)(OrganizationContainer);

const renderBodyTable = (data: any) =>
  data?.map((row: any) => ({
    id: row.id,
    name: row.name,
    user: row.user,
    created_at: dayjs(row.created_at).format('DD/MM/YYYY'),
    updated_at: dayjs(row.updated_at).format('DD/MM/YYYY'),
  }));
