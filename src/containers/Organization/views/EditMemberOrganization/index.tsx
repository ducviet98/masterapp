import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm } from 'react-hook-form';

// Mui
import { Button, Grid, Container, Card, Box } from '@mui/material';
// Component
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { usePagination } from 'src/hooks/usePagination';
import CookieHandlerInstance from 'src/utils/cookie';

import {
  getDetailOrganizationMemberRequest,
  getRoleOrganizationMemberRequest,
  deleteMemberOrganizationRequest,
  updateMemberOrganizationRequest,
} from '../../store/actions';
import {
  makeSelectDetailOrganizationMember,
  makeSelectIsLoadingOrganization,
  makeSelectRoleOrganizationMember,
  makeSelectOrganization,
  makeSelectOrganizationMember,
} from '../../store/selectors';
import {
  detailOrganizationType,
  RoleType,
  OrganizationType,
  OrganizationMemberType,
} from '../../interface';

interface EditMemberOrganizationType {
  isLoading: boolean;
  detailOrganization: detailOrganizationType;
  rolesOrganizations: RoleType[];
  organization: [OrganizationType];
  organizationMember: [OrganizationMemberType];
}

const schemaEditMemberOrganization = Yup.object().shape({
  // role: Yup.array().required('Role is required'),
});

const EditMemberOrganization = (props: EditMemberOrganizationType) => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');

  const { isLoading, detailOrganization, rolesOrganizations, organization, organizationMember } =
    props;

  const { id } = useParams<{
    id: string;
  }>();

  const { debouncedSearchTerm, page, rowsPerPage, search, filter, handleSearch, setSearch } =
    usePagination();

  const defaultValues = useMemo(
    () => ({
      role: detailOrganization?.role || '',
      email: '',
    }),
    [detailOrganization]
  );

  const methods = useForm<any>({
    resolver: yupResolver(schemaEditMemberOrganization),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: any) => {
    dispatch(
      updateMemberOrganizationRequest({
        ...values,
        id,
        role: values.role.id,
        callback: () => {},
      })
    );
  };

  const handleScroll: React.EventHandler<React.UIEvent<HTMLUListElement>> = (event) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;

    if (listboxNode.scrollHeight - position <= 1) {
      dispatch(
        getRoleOrganizationMemberRequest({
          page,
          rowsPerPage: rowsPerPage + 10,
          search: debouncedSearchTerm,
          ordering: filter,
        })
      );
    }
  };

  const handleDelete = () => {
    dispatch(
      deleteMemberOrganizationRequest({
        id,
        currentOrganizations,
        organizationMember,
        organization,
        user: detailOrganization.user,
        callback: () => {
          navigate('/organization');
        },
        callbackOrg: () => {
          navigate('/organization/new');
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getDetailOrganizationMemberRequest(id));
  }, [id, dispatch]);

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
    <Page title="Organization Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Organization Edit"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Organization', href: '/organization' },
            { name: 'Name...' },
          ]}
          action={
            <>
              <Button onClick={handleDelete} variant="contained" sx={{ marginRight: 2 }}>
                Delete
              </Button>
              <Button onClick={handleSubmit(onSubmit)} variant="outlined">
                Save
              </Button>
            </>
          }
        />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'grid',
                  }}
                >
                  <RHFTextField name="email" label="Email" disabled sx={{ marginBottom: 2 }} />

                  <RHFAutocomplete
                    valueSearch={search || ''}
                    onChangeSearch={handleSearch}
                    options={rolesOrganizations}
                    name="role"
                    error={errors.role?.message}
                    helperText={errors.role?.message}
                    getOptionLabel={(option: any) => option?.name || ''}
                    label="Select roles "
                    setSearch={setSearch}
                    handleScroll={handleScroll}
                    values={detailOrganization?.role}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </Page>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingOrganization(),
  detailOrganization: makeSelectDetailOrganizationMember(),
  rolesOrganizations: makeSelectRoleOrganizationMember(),
  organization: makeSelectOrganization(),
  organizationMember: makeSelectOrganizationMember(),
});

export default connect(mapStateToProps)(EditMemberOrganization);
