import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
  FormProvider, RHFTextField
} from 'src/components/hook-form';
import { createCertificateRequest, editCertificateRequest } from '../../store/actions';
import { path } from 'src/constants/path';
import { makeSelectIsLoadingAction } from '../../store/selectors';
import { CertificateType } from '../../interfaces';

const DeviceSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

const DeviceSchemaEdit = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  certificate: Yup.string().required('Certificate is required'),
});

type IParamsCertificate = {
  name: string
}

type FormCertificateType = {
  isEdit?: boolean,
  certificateDetail?: CertificateType
}

const FormCertificate = (props: FormCertificateType) => {

  const { isEdit, certificateDetail } = props;


  const isLoadingAction = useSelector(makeSelectIsLoadingAction())

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      name: '',
    }),
    []
  );

  const defaultValuesEdit = useMemo(
    () => ({
      name: certificateDetail?.name || '',
      certificate: certificateDetail?.certificate || '',
      csr: certificateDetail?.csr || '',
      key: certificateDetail?.key || '',
    }),
    [certificateDetail]
  );

  const methods = useForm({
    resolver: yupResolver(isEdit ? DeviceSchemaEdit : DeviceSchema),
    defaultValues: isEdit ? defaultValuesEdit : defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (isEdit && certificateDetail) {
      reset(defaultValuesEdit);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, certificateDetail]);

  const onSubmit = async (values: IParamsCertificate) => {
    if (isEdit) {
      dispatch(editCertificateRequest({
        ...values,
        id: certificateDetail?.id,
        callback: () => {
          reset();
          navigate(path.certificates)
        }
      }))
    }
    else {
      dispatch(createCertificateRequest({
        ...values, callback: () => {
          reset();
        }
      }))
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={isEdit ? 6 : 12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} mb={2}>
              <RHFTextField name="name" label="Name" required />
              {
                isEdit && <RHFTextField required name="certificate" label="Certificate" multiline rows={3} />
              }
            </Stack>

            <Stack
              justifyContent="space-between"
              direction="row"
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                component={RouterLink}
                to={path.certificates}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <LoadingButton loading={isLoadingAction} type="submit" variant="contained">
                {
                  isEdit ? 'Update' : 'Create'
                }
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        {
          isEdit && <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                {
                  isEdit && <RHFTextField name="csr" label="CSR" multiline rows={6} InputProps={{ readOnly: true }} />

                }
                {
                  isEdit && <RHFTextField name="key" label="Key" multiline rows={6} InputProps={{ readOnly: true }} />

                }
              </Stack>
            </Card>
          </Grid>
        }

      </Grid>
    </FormProvider>
  )
}

export default FormCertificate
