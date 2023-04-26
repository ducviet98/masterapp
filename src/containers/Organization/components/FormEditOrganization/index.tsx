import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { usePagination } from 'src/hooks/usePagination';

import {
  detailOrganizationType,
  RoleType,
  OrganizationType,
  OrganizationMemberType,
} from '../../interface';

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

interface FormOrganizationType {
  // oldData: detailOrganizationType;
}

const schemaEditMemberOrganization = Yup.object().shape({
  // role: Yup.array().required('Role is required'),
});

const FormOrganization = (props: FormOrganizationType) => {
  const dispatch = useDispatch();
  const rolesOrganizations: RoleType[] = useSelector(makeSelectRoleOrganizationMember());
  const isLoading: boolean = useSelector(makeSelectIsLoadingOrganization());
  const detailsOrganization: detailOrganizationType = useSelector(
    makeSelectDetailOrganizationMember()
  );

  const { id } = useParams<{
    id: string;
  }>();

  const defaultValues = useMemo(
    () => ({
      role: detailsOrganization?.role || '',
      email: detailsOrganization?.email || '',
    }),
    [detailsOrganization]
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
        role_id: values.role.id,
        callback: () => {},
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              <RHFTextField name="email" label="Email" disabled />

              <RHFAutocomplete
                options={rolesOrganizations}
                name="role"
                getOptionLabel={(option: any) => option?.name || ''}
                label="Select roles "
              />
            </Box>
            <Stack justifyContent="space-between" direction="row" sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                component={RouterLink}
                to={path.organization}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <LoadingButton
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                variant="contained"
              >
                Update
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FormOrganization;
