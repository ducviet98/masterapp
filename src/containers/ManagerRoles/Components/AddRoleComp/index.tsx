import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Mui
import {
  AppBar,
  Dialog,
  Toolbar,
  Typography,
  Grid,
  Card,
  Box,
  Stack,
  Button,
  Autocomplete,
  TextField,
  Checkbox,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// Components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';
import { path } from 'src/constants/path';
import { RHFMultiCheckbox } from 'src/hooks/RHFCheckbox';

import { addRoleType, IKey } from '../../interface';
import { makeSelectPermission, makeSelectIsLoadingManagerRole } from '../../store/selectors';
import { AddRoleSchema } from '../../constants';

const AddRoleComp = ({ openDialog, handleToggleDialog }: addRoleType) => {
  const permissions: [IKey] = useSelector(makeSelectPermission());
  const isLoading: boolean = useSelector(makeSelectIsLoadingManagerRole());

  const defaultValues = useMemo(
    () => ({
      all: false,
      name: '',
      permissions: [],
    }),
    []
  );

  const methods = useForm<any>({
    resolver: yupResolver(AddRoleSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError, watch, setValue } = methods;

  const onSubmit = async (values: any) => {
    console.log('values', values);
  };

  const all = watch('all');

  const handleSelectAllPermission = (event: any) => {
    const checked = event.target.checked;

    console.log('event', event)
    setValue('all', checked);
    if (checked) {
      setValue('permissions', permissions, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue('permissions', [], { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleToggleDialog}
      aria-labelledby="form-dialog-title"
      scroll="body"
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            minWidth: '400px',
          },
        },
      }}
    >
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            New Role
          </Typography>
        </Toolbar>
      </AppBar>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <RHFTextField name="name" label="Name" sx={{ mb: 2 }} />
              <RHFAutocomplete
                multiple
                options={permissions}
                name="permissions"
                getOptionLabel={(option: any) => option || ''}
                label="status"
                renderInput={(params: any) => <TextField {...params} label="Select permissions" />}
              />
              <Stack justifyContent="space-between" direction="row" sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to={path.device}
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
                  Send
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default AddRoleComp;
