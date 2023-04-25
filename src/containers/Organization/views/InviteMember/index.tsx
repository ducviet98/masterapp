/* eslint-disable camelcase */
import { useMemo } from 'react';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Mui
import { Grid, Dialog, Button, AppBar, Typography, Toolbar, Card, Box, Stack } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
// Component
import { usePagination } from 'src/hooks/usePagination';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/RHFAutocomplete';

import { InviteMemberType } from '../../interface';
import {
  getRoleOrganizationMemberRequest,
  inviteOrganizationMemberRequest,
} from '../../store/actions';
import { InviteMemberSchema } from '../../constant';

function InviteMember(props: InviteMemberType) {
  const { openDialog, handleToggleDialog, rolesOrganizations, organization_id, isLoading } = props;
  const dispatch = useDispatch();

  const defaultValues = useMemo(
    () => ({
      email: '',
      role: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(InviteMemberSchema),
    defaultValues,
  });

  const { debouncedSearchTerm, page, rowsPerPage, search, filter, handleSearch, setSearch } =
    usePagination();

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: any) => {
    dispatch(
      inviteOrganizationMemberRequest({
        ...values,
        user: values.email,
        role: values.role.id,
        callback: () => {
          reset();
          handleToggleDialog();
        },
      })
    );
  };

  const handleScroll: React.EventHandler<React.UIEvent<HTMLUListElement>> = (event) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;

    if (listboxNode.scrollHeight - position <= 1) {
      dispatch(
        getRoleOrganizationMemberRequest({
          page,
          rowsPerPage: rowsPerPage + 10,
          search: debouncedSearchTerm,
          ordering: filter,
        })
      );
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
            minWidth: '300px',
          },
        },
      }}
    >
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <Typography variant="subtitle1" color="inherit">
            Invite member
          </Typography>
        </Toolbar>
      </AppBar>

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
                <RHFTextField name="email" label="Email to" required />
                <RHFAutocomplete
                  valueSearch={search || ''}
                  onChangeSearch={handleSearch}
                  options={rolesOrganizations}
                  name="role"
                  error={errors.role?.message}
                  helperText={errors.role?.message}
                  getOptionLabel={(option: any) => option?.name || ''}
                  label="Select roles "
                  setSearch={setSearch}
                  handleScroll={handleScroll}
                />
              </Box>

              <Stack justifyContent="space-between" direction="row" sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={handleToggleDialog}
                  startIcon={<ArrowBackIcon />}
                >
                  Cancel
                </Button>
                <LoadingButton loading={isLoading} type="submit" variant="contained">
                  Create
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Dialog>
  );
}

export default InviteMember;
