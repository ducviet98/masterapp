import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { getCertificateRequest } from 'src/containers/Certificates/store/actions';
import * as Yup from 'yup';
import reducerCertificates from 'src/containers/Certificates/store/reducer';
import sagaCertificates from 'src/containers/Certificates/store/sagas';
import reducerDevice from 'src/containers/Devices/store/reducer';
import sagaDevice from 'src/containers/Devices/store/sagas';
import { makeSelectListDevice } from 'src/containers/Devices/store/selectors';
import { usePagination } from 'src/hooks/usePagination';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { createMfiTokenRequest, editMfiTokenRequest } from '../../store/actions';
import { MFiTokenType } from '../../interfaces';
import { getUserDeviceRequest } from 'src/containers/Devices/store/actions';
import { DeviceUser } from 'src/containers/Devices/interface';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

type FormMfiTokenType = {
  isEdit: boolean;
  oldData?: MFiTokenType;
  idDevice?: string;
};

const FormMfiToken = ({ isEdit, oldData, idDevice }: FormMfiTokenType) => {
  useInjectReducer({ key: 'certificate', reducer: reducerCertificates });
  useInjectSaga({ key: 'certificate', saga: sagaCertificates });

  useInjectReducer({ key: 'device', reducer: reducerDevice });
  useInjectSaga({ key: 'device', saga: sagaDevice });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listDevice: DeviceUser[] = useSelector(makeSelectListDevice());

  const { rowsPerPage, debouncedSearchTerm, search, handleSearch, setSearch } = usePagination();

  const defaultValues = useMemo(
    () => ({
      name: '',
      device: '',
    }),
    []
  );

  const defaultValuesEdit = useMemo(
    () => ({
      name: oldData?.name || '',
      device: oldData?.device || '',
      request_id: oldData?.request_id || '',
    }),
    [oldData]
  );

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: isEdit ? defaultValuesEdit : defaultValues,
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = async (values: any) => {
    if (!values.device?.ppid) {
      return setError('ppid', {
        type: 'custom',
        message: 'ppid id is required',
      });
    }

    if (isEdit) {
      return dispatch(
        editMfiTokenRequest({
          ...values,
          idDevice,
          device: values.device.ppid,
          callback: () => {
            navigate(path.mfiToken);
          },
        })
      );
    } else {
      return dispatch(
        createMfiTokenRequest({
          ...values,
          device: values.device.ppid,
          callback: () => {
            reset();
            navigate(path.mfiToken);
          },
        })
      );
    }
  };

  const handleScroll: React.EventHandler<React.UIEvent<HTMLUListElement>> = (event) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;

    if (listboxNode.scrollHeight - position <= 1) {
      dispatch(
        getCertificateRequest({
          page: 0,
          rowsPerPage: rowsPerPage + 10,
          search: debouncedSearchTerm,
        })
      );
      dispatch(
        getUserDeviceRequest({
          page: 0,
          rowsPerPage: rowsPerPage + 10,
          search: debouncedSearchTerm,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      getCertificateRequest({
        page: 0,
        rowsPerPage: 6,
        search: debouncedSearchTerm,
      })
    );
  }, [dispatch, debouncedSearchTerm]);

  useEffect(() => {
    dispatch(
      getUserDeviceRequest({
        page: 0,
        rowsPerPage: 6,
        search: debouncedSearchTerm,
      })
    );
  }, [dispatch, debouncedSearchTerm]);

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
              <RHFAutocomplete
                valueSearch={search || ''}
                onChangeSearch={handleSearch}
                options={listDevice}
                name="device"
                getOptionLabel={(option: DeviceUser) => option?.ppid || ''}
                label="device"
                setSearch={setSearch}
                handleScroll={handleScroll}
              />

              {isEdit && <RHFTextField name="request_id" label="Request id" />}
            </Box>
            <Stack justifyContent="space-between" direction="row" sx={{ mt: 3 }}>
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

export default FormMfiToken;
