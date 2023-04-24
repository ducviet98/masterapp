import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Mui
import { Button, Grid, Typography, Container, Card } from '@mui/material';
import { Add as AddIcon, PersonAddAlt as PersonAddAltIcon } from '@mui/icons-material';

import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { TableComp } from 'src/components/table';
import { usePagination } from 'src/hooks/usePagination';
import Toolbar from 'src/containers/Certificates/components/Toolbar';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';

import reducer from './store/reducers';
import saga from './store/sagas';

import {
  makeSelectIsLoadingOrganization,
  makeSelectTotalOrganization,
  makeSelectOrganization,
  makeSelectOrganizationMember,
  makeSelectRoleOrganizationMember,
} from './store/selectors';
import { OrganizationType, OrganizationMemberType } from './interface';
import { FILTER_OPTIONS, headersTable } from './constant';
import { getOrganizationMemberRequest, getRoleOrganizationMemberRequest } from './store/actions';

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
  console.log('roleUser', roleUser);
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
    console.log('id', id);
  };

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
    dispatch(getRoleOrganizationMemberRequest());
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
                  to={'/organization/new'}
                  startIcon={<AddIcon />}
                  sx={{ marginRight: 1 }}
                >
                  Add Organization
                </Button>
                <Button variant="outlined" startIcon={<PersonAddAltIcon />}>
                  Invite Member
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
      {/* <InviteMember openDialog={} /> */}
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
    created_at: dayjs(row.created_at).format('DD/MM/YYYY'),
    updated_at: dayjs(row.updated_at).format('DD/MM/YYYY'),
  }));
