import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField
} from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { CertificateType } from 'src/containers/Certificates/interfaces';
import reducerCertificate from 'src/containers/Certificates/store/reducer';
import sagaCertificate from 'src/containers/Certificates/store/sagas';
import { makeSelectCertificate } from 'src/containers/Certificates/store/selectors';
import { usePagination } from 'src/hooks/usePagination';
import { DeviceSchema } from '../../constants';
import { BrandType, FormUserType } from '../../interface';
import { createDeviceRequest, editDeviceRequest, getBrandsRequest, getCategoriesRequest, getStatusRequest } from '../../store/actions';
import reducer from '../../store/reducer';
import saga from '../../store/sagas';
import {
  makeSelectListBrands,
  makeSelectListCategories,
  makeSelectListStatus
} from '../../store/selectors';

import { getCertificateRequest } from 'src/containers/Certificates/store/actions';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';

const FormUser = ({ isEdit, oldData, idDevice }: FormUserType) => {

  useInjectReducer({ key: 'device', reducer });
  useInjectSaga({ key: 'device', saga });

  useInjectReducer({ key: 'certificate', reducer: reducerCertificate });
  useInjectSaga({ key: 'certificate', saga: sagaCertificate });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brands: BrandType[] = useSelector(makeSelectListBrands());
  const categories: BrandType[] = useSelector(makeSelectListCategories());
  const status: BrandType[] = useSelector(makeSelectListStatus());
  const certificates: CertificateType[] = useSelector(makeSelectCertificate())

  const {
    debouncedSearchTerm,
    search,
    handleSearch,
    setSearch
  } = usePagination();

  const defaultValues = useMemo(
    () => ({
      name: oldData?.name || '',
      description: oldData?.description || '',
      model_number: oldData?.model_number || '',
      upc: oldData?.upc || '',
      ppid: oldData?.ppid || '',
      brand: oldData?.brand || '',
      category: oldData?.category || '',
      status: oldData?.status || '',
      certificate: certificates.find((item: any) => item.id === oldData?.certificate) || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [oldData, certificates.length]
  );

  const methods = useForm<any>({
    resolver: yupResolver(DeviceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = async (values: any) => {
    dispatch(
      isEdit
        ? editDeviceRequest({
          ...values,
          certificate: values.certificate?.id,
          idDevice,
          callback: () => {
            reset();
            navigate(path.device)
          },
        })
        : createDeviceRequest({
          ...values,
          certificate: values.certificate?.id,
          callback: () => {
            reset();
            navigate(path.device)
          },
        })
    );
  };

  useEffect(() => {
    dispatch(getCategoriesRequest())
    dispatch(getStatusRequest())
    dispatch(getBrandsRequest())
    dispatch(getCertificateRequest({
      page: 0,
      rowsPerPage: 10,
      search: debouncedSearchTerm,
      ordering: ''
    }))
  }, [dispatch, debouncedSearchTerm])

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
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="description" label="Description" />
              <RHFTextField name="model_number" label="Model number" />
              <RHFTextField name="upc" label="upc" />
              <RHFTextField name="ppid" label="ppid" />
              <RHFSelect name="brand" label="brand" placeholder="Brand">
                <option value="" />
                {brands?.map((option: BrandType) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="category" label="Country" placeholder="Country">
                <option value="" />
                {categories?.map((option: BrandType) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="Status" placeholder="Status">
                <option value="" />
                {status?.map((option: BrandType) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFAutocomplete
                valueSearch={search || ''}
                onChangeSearch={handleSearch}
                options={certificates}
                name="certificate"
                getOptionLabel={(option: CertificateType) => option?.name || ''}
                label="certificate"
                setSearch={setSearch}
              />
            </Box>
            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                component={RouterLink}
                to={path.device}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <LoadingButton type="submit" variant="contained">
                {isEdit ? 'Update' : 'Create'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FormUser;
