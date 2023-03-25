import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { MFiAPIType } from '../../interfaces';
import { createMfiApiRequest, editMfiApiRequest } from '../../store/actions';
import { makeSelectIsLoadingAction } from '../../store/selectors';
import useFormApi from './hook';

const schema = Yup.object().shape({
  url: Yup.string().required('Url is required'),
  name: Yup.string().required('Name is required'),
  method: Yup.string().required('Method is required'),
});

type FormMfiApiType = {
  isEdit: boolean;
  oldData?: MFiAPIType;
};

const FormMfiApi = ({ isEdit, oldData }: FormMfiApiType) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoadingAction = useSelector(makeSelectIsLoadingAction())

  const defaultValues = useMemo(
    () => ({
      url: oldData?.url || '',
      name: oldData?.name || '',
      method: oldData?.method || '',
    }),
    [oldData]
  );

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const { handleSetData,
    handleAdd,
    handleRemoveQuery,
    query,
    param,
    body,
    dataApi,
    setDataApi
  } = useFormApi()

  const onSubmit = async (values: any) => {
    if (isEdit) {
      return dispatch(
        editMfiApiRequest({
          ...values,
          body: dataApi.body,
          param: dataApi.param,
          query: dataApi.query,
          id: oldData?.id,
          callback: () => {
            reset();
            navigate(path.mfiApi)
          },
        })
      );
    } else {
      return dispatch(
        createMfiApiRequest({
          ...values,
          body: dataApi.body,
          param: dataApi.param,
          query: dataApi.query,
          callback: () => {
            reset();
            setDataApi({
              param: {},
              query: {},
              body: {},
            });
            navigate(path.mfiApi)
          },
        })
      );
    }
  };

  useEffect(() => {
    if (oldData) {
      const { param, query, body } = oldData;
      setDataApi({
        param,
        query,
        body,
      });
    }

  }, [oldData]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} mb={2}>
              <RHFTextField required name="name" label="Name" />
              <Stack direction="row" spacing={2}>
                <RHFTextField required name="url" label="URL" />

                <RHFAutocomplete
                  options={['GET', 'POST', 'PUT', 'DELETE', 'PATH']}
                  name="method"
                  label="method"
                />
              </Stack>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Query
                </Typography>
                <Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      name="key"
                      label="Key"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdd(e, 'query')}
                      value={query.key}
                    />
                    <TextField
                      fullWidth
                      name="value"
                      label="Value"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdd(e, 'query')}
                      value={query.value}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '14px',
                    }}
                  >
                    <Button onClick={() => handleSetData('query')}>Add</Button>
                  </Box>
                </Stack>
                <List>
                  {dataApi.query &&
                    Object.keys(dataApi.query).map((item: string, index: number) => {
                      console.log('item', item);
                      return (
                        <ListItem
                          sx={{
                            paddingLeft: 0,
                          }}
                          key={index}
                          secondaryAction={
                            <IconButton
                              onClick={() => handleRemoveQuery(item, 'query')}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={item}
                            sx={{
                              paddingLeft: '14px',
                            }}
                          />
                          <ListItemText primary={dataApi.query[item]} />
                        </ListItem>
                      );
                    })}
                </List>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Params
                </Typography>
                <Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      name="key"
                      label="Key"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdd(e, 'param')}
                      value={param.key}
                    />
                    <TextField
                      fullWidth
                      name="value"
                      label="Value"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdd(e, 'param')}
                      value={param.value}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '14px',
                    }}
                  >
                    <Button onClick={() => handleSetData('param')}>Add</Button>
                  </Box>
                </Stack>
                <List>
                  {dataApi.param &&
                    Object.keys(dataApi.param).map((item: any, index: number) => (
                      <ListItem
                        sx={{
                          paddingLeft: 0,
                        }}
                        key={index}
                        secondaryAction={
                          <IconButton
                            onClick={() => handleRemoveQuery(item, 'param')}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={item}
                          sx={{
                            paddingLeft: '14px',
                          }}
                        />
                        <ListItemText primary={dataApi.param[item]} />
                      </ListItem>
                    ))}
                </List>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Body
                </Typography>
                <Stack>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      name="key"
                      label="Key"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdd(e, 'body')}
                      value={body.key}
                    />
                    <TextField
                      fullWidth
                      name="value"
                      label="Value"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdd(e, 'body')}
                      value={body.value}
                    />
                  </Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '14px',
                    }}
                  >
                    <Button onClick={() => handleSetData('body')}>Add</Button>
                  </Box>
                </Stack>
                <List>
                  {dataApi.body &&
                    Object.keys(dataApi.body).map((item: any, index: number) => (
                      <ListItem
                        sx={{
                          paddingLeft: 0,
                        }}
                        key={index}
                        secondaryAction={
                          <IconButton
                            onClick={() => handleRemoveQuery(item, 'body')}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={item}
                          sx={{
                            paddingLeft: '14px',
                          }}
                        />
                        <ListItemText primary={dataApi.body[item]} />
                      </ListItem>
                    ))}
                </List>
              </Box>
            </Stack>

            <Stack justifyContent="space-between" direction="row" sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                component={RouterLink}
                to={path.device}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <LoadingButton disabled={isLoadingAction} loading={isLoadingAction} type="submit" variant="contained">
                {isEdit ? 'Update' : 'Create'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default FormMfiApi;
