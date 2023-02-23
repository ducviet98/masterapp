import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { createDeviceRequest } from '../../store/actions';
import { makeSelectListBrands, makeSelectListCategories, makeSelectListStatus } from '../../store/selectors';

export const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
]

const FormUser = () => {

  const dispatch = useDispatch()

  const brands = useSelector(makeSelectListBrands());
  const categories = useSelector(makeSelectListCategories());
  const status = useSelector(makeSelectListStatus());

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      model_number: '',
      upc: '',
      ppid: '',
      brand: '',
      category: '',
      status: '',
    }),
    []
  );

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    model_number: Yup.string().required('Model number is required'),
    upc: Yup.string().required('upc is required'),
    ppid: Yup.string().required('ppid is required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    status: Yup.string().required('Status is required'),
  });

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    dispatch(createDeviceRequest({
      ...values,
      callback: () => {
        reset()
      }
    }))
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
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="description" label="Description" />
              <RHFTextField name="model_number" label="Model number" />
              <RHFTextField name="upc" label="upc" />
              <RHFTextField name="ppid" label="ppid" />
              <RHFSelect name="brand" label="brand" placeholder="Brand">
                <option value="" />
                {brands?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="category" label="Country" placeholder="Country">
                <option value="" />
                {categories?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="Status" placeholder="Status">
                <option value="" />
                {status?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" >
                Create User
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}

export default FormUser