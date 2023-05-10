import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

// Mui
import {
  AppBar,
  Dialog,
  Toolbar,
  Typography,
  Grid,
  Card,
  Stack,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// Components
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';

import { IAddRole, IKey } from '../../interface';
import { makeSelectPermission, makeSelectIsLoadingManagerRole } from '../../store/selectors';
import { AddRoleSchema } from '../../constants';
import { createRoleRequest, getRoleRequest, updateRoleRequest } from '../../store/actions';

const AddRoleComp = ({ openDialog, handleToggleDialog, roleDetail }: IAddRole) => {
  const permissions: [IKey] = useSelector(makeSelectPermission());
  const isLoading: boolean = useSelector(makeSelectIsLoadingManagerRole());
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const { reset, handleSubmit, watch, setValue } = methods;

  const onSubmit = async (values: any) => {
    if (roleDetail?.id) {
      dispatch(
        updateRoleRequest({
          ...values,
          id: roleDetail?.id,
          callback: () => {
            handleToggleDialog();
            reset();
          },
        })
      );
    } else {
      dispatch(
        createRoleRequest({
          ...values,
          callback: () => {
            dispatch(
              getRoleRequest({
                page: 0,
                rowsPerPage: 10,
                search: '',
                ordering: '',
              })
            );
            handleToggleDialog();
            reset();
          },
        })
      );
    }
  };

  const all = watch('all');

  const handleSelectAllPermission = (event: any) => {
    const { checked } = event.target;
    setValue('all', checked);
    if (checked) {
      setIsCheckAll(true);
      setValue('permissions', permissions, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setIsCheckAll(false);
      setValue('permissions', [], { shouldValidate: true, shouldDirty: true });
    }
  };

  const onClearAllValues = (event: React.SyntheticEvent<EventTarget>) => {
    const { cancelable } = event;
    if (cancelable) {
      setIsCheckAll(false);
    }
  };

  useEffect(() => {
    if (all) {
      setValue('permissions', permissions, { shouldValidate: true });
    } else {
      setValue('permissions', [], { shouldValidate: true });
    }
  }, [all, permissions, setValue]);

  useEffect(() => {
    reset({
      name: roleDetail?.name,
      permissions: roleDetail?.permissions,
    });
  }, [reset, roleDetail?.id, roleDetail?.name, roleDetail?.permissions]);

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
        <Toolbar>
          <Typography variant="subtitle1" color="inherit">
            New Role
          </Typography>
        </Toolbar>
      </AppBar>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <RHFTextField name="name" label="Name" sx={{ mb: 2 }} autoFocus />
              <FormControl>
                <FormControlLabel
                  label="Select All Permission"
                  control={
                    <Checkbox
                      size="small"
                      onChange={handleSelectAllPermission}
                      name="all"
                      checked={isCheckAll}
                    />
                  }
                />
              </FormControl>
              <RHFAutocomplete
                multiple
                options={permissions}
                name="permissions"
                label="status"
                renderInput={(params: any) => <TextField {...params} label="Select permissions" />}
                onInputChange={onClearAllValues}
              />
              <Stack justifyContent="space-between" direction="row" sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handleToggleDialog}
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
                  Create
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
