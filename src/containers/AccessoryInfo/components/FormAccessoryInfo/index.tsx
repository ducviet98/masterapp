import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
  FormProvider, RHFTextField
} from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { getMfiTokenRequest } from 'src/containers/MfiToken/store/actions';
import reducer from 'src/containers/MfiToken/store/reducer';
import saga from 'src/containers/MfiToken/store/sagas';
import { makeSelectMfiToken } from 'src/containers/MfiToken/store/selectors';
import { usePagination } from 'src/hooks/usePagination';
import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import { createAccessoryInfoRequest } from '../../store/actions';
import { makeSelectIsLoadingAction } from '../../store/selectors';
import { MFiTokenType } from 'src/containers/MfiToken/interfaces';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  cid: Yup.number().min(0).max(10).required('CID is required').typeError('CID is required'),
  mfi_token_id: Yup
    .object()
    .shape({
      id: Yup.string(),
    })
    .required('MFI token is required')
});

const FormAccessoryInfo = () => {
  useInjectReducer({ key: 'mfiToken', reducer: reducer });
  useInjectSaga({ key: 'mfiToken', saga: saga });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mfiTokens: MFiTokenType[] = useSelector(makeSelectMfiToken())
  const isLoadingAction: boolean = useSelector(makeSelectIsLoadingAction())
  const {
    debouncedSearchTerm,
    page,
    rowsPerPage,
    search,
    filter,
    handleSearch,
    setSearch
  } = usePagination();

  const defaultValues = useMemo(
    () => ({
      mfi_token_id: null,
      cid: '',
      name: ''
    }),
    []
  );

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: any) => {
    dispatch(createAccessoryInfoRequest({
      ...values,
      mfi_token_id: values?.mfi_token_id?.id,
      callback: () => {
        reset();
        navigate(path.accessoryInfo)
      },
    }))

  };

  const handleScroll: React.EventHandler<React.UIEvent<HTMLUListElement>> = (event) => {

    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;

    if (listboxNode.scrollHeight - position <= 1) {
      dispatch(getMfiTokenRequest({
        page,
        rowsPerPage: rowsPerPage + 10,
        search: debouncedSearchTerm,
        ordering: filter
      }))
    }
  };

  useEffect(() => {
    dispatch(getMfiTokenRequest({
      page,
      rowsPerPage,
      search: debouncedSearchTerm,
      ordering: filter
    }))
  }, [dispatch, debouncedSearchTerm, filter, page, rowsPerPage])

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
              <RHFTextField type="number" name="cid" label="CID" />
              <RHFTextField name="name" label="Name" />
              <RHFAutocomplete
                valueSearch={search || ''}
                onChangeSearch={handleSearch}
                options={mfiTokens}
                name="mfi_token_id"
                error={errors.mfi_token_id?.message}
                helperText={errors.mfi_token_id?.message}
                getOptionLabel={(option: any) => option?.name || ''}
                label="MFI Token"
                setSearch={setSearch}
                handleScroll={handleScroll}
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
              <LoadingButton loading={isLoadingAction} disabled={isLoadingAction} type="submit" variant="contained">
                Create
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FormAccessoryInfo;
