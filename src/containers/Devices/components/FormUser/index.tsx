import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  FormProvider,
  RHFSelect,
  RHFTextField
} from 'src/components/hook-form';
import { DeviceSchema } from '../../constants';
import { FormUserType, BrandType } from '../../interface';
import { createDeviceRequest, editDeviceRequest } from '../../store/actions';
import {
  makeSelectListBrands,
  makeSelectListCategories,
  makeSelectListStatus
} from '../../store/selectors';
import { path } from 'src/constants/path'

const FormUser = ({ isEdit, oldData, idDevice }: FormUserType) => {
  const dispatch = useDispatch();

  const brands: BrandType[] = useSelector(makeSelectListBrands());
  const categories: BrandType[] = useSelector(makeSelectListCategories());
  const status: BrandType[] = useSelector(makeSelectListStatus());

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
    }),
    [oldData]
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
          idDevice,
          callback: () => {
            reset();
          },
        })
        : createDeviceRequest({
          ...values,
          callback: () => {
            reset();
          },
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
                {isEdit ? 'Update User' : 'Create User'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FormUser;
