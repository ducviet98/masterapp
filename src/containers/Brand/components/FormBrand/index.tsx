import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  FormProvider, RHFTextField
} from 'src/components/hook-form';
import { path } from 'src/constants/path';
import { BrandType } from '../../interfaces';
import { createBrandRequest, editBrandRequest } from '../../store/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

type FormBrandType = {
  isEdit: boolean;
  oldData?: BrandType;
  idDevice?: string;
}

const FormBrand = ({ isEdit, oldData, idDevice }: FormBrandType) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      name: oldData?.name || '',
    }),
    [oldData]
  );

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = async (values: any) => {
    if (isEdit) {
      return dispatch(
        editBrandRequest({
          ...values,
          id: idDevice,
          callback: () => {
            navigate(path.brand)
          },
        })
      );
    }
    else {
      return dispatch(createBrandRequest({
        ...values,
        callback: () => {
          reset();
        },
      }))
    }

  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
              }}
            >
              <RHFTextField name="name" label="Name" />
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

export default FormBrand;
