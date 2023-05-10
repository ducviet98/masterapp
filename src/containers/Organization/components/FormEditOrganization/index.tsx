import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { usePagination } from 'src/hooks/usePagination';

import {
  DetailOrganizationType,
  RoleType
} from '../../interface';

import {
  updateMemberOrganizationRequest
} from '../../store/actions';
import {
  makeSelectIsLoadingOrganization,
  makeSelectRoleOrganizationMember
} from '../../store/selectors';

interface FormOrganizationType {
  oldData: DetailOrganizationType;
  id: string | undefined;
}

const schemaEditMemberOrganization = Yup.object().shape({
  role: Yup
    .object()
    .shape({
      id: Yup.string(),
    })
    .required('Role is required')
});

const FormOrganization = ({ oldData, id }: FormOrganizationType) => {
  const dispatch = useDispatch();
  const rolesOrganizations: RoleType[] = useSelector(makeSelectRoleOrganizationMember());
  const isLoading: boolean = useSelector(makeSelectIsLoadingOrganization());

  const defaultValues = useMemo(
    () => ({
      role: oldData?.role || '',
      email: oldData?.email || '',
    }),
    [oldData]
  );

  const methods = useForm<any>({
    resolver: yupResolver(schemaEditMemberOrganization),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue
  } = methods;

  const onSubmit = async (values: any) => {
    dispatch(
      updateMemberOrganizationRequest({
        ...values,
        id,
        role_id: values.role.id,
        callback: () => { },
      })
    );
  };

  useEffect(() => {
    setValue('email', oldData?.email)
    setValue('role', oldData?.role)
  }, [oldData, setValue])

  const {
    search,
    handleSearch,
    setSearch
  } = usePagination();

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
                error={errors.role?.message}
                helperText={errors.role?.message}
                getOptionLabel={(option: RoleType) => option?.name || ''}
                label="Select roles "
                valueSearch={search || ''}
                onChangeSearch={handleSearch}
                setSearch={setSearch}
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
