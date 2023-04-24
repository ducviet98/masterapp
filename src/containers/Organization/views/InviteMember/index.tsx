/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { RoleType } from '../../interface';


const schema = yup.object().shape({
  email: yup
    .string()
    .required('You must enter an e-mail')
    .email('You must enter a valid e-mail.'),
  roles: yup.array().min(1, 'You must select role'),
});

interface InviteMemberType {
  openDialog: boolean;
  handleToggleDialog: () => void;
  rolesOrganizations: [RoleType];
  organization_id: string;
  isLoading: boolean;
}

function InviteMember(props: InviteMemberType) {
  const {
    openDialog,
    handleToggleDialog,
    rolesOrganizations,
    organization_id,
    isLoading,
  } = props;
  const dispatch = useDispatch();
  const { handleSubmit, formState, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      roles: [],
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data: any) {
    // dispatch(
    //   inviteMemberOrganization({
    //     ...data,
    //     roles: data.roles.map((item) => item._id),
    //     organization_id,
    //     callback: () => {
    //       handleToggleDialog();
    //       dispatch(
    //         getMemberOrganization({
    //           id: organization_id,
    //           page: 0,
    //           rowsPerPage: 10,
    //           search: '',
    //         })
    //       );
    //     },
    //   })
    // );
  }

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
            Invite member
          </Typography>
        </Toolbar>
      </AppBar>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <DialogContent
          classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0 min-w-200' }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                label="To"
                autoFocus
                id="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                variant="outlined"
                fullWidth
                required
              />
            )}
          />

          <Controller
            name="roles"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                className="mt-8 mb-16"
                multiple
                // name="roles"
                options={rolesOrganizations}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Roles"
                    name="roles"
                    label="Select Roles"
                    variant="outlined"
                    error={!!errors.roles}
                    helperText={errors?.roles?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
        </DialogContent>

        <DialogActions className="flex flex-col w-full sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">
          <div className="flex w-full items-center justify-end space-x-8 mt-16 sm:mt-0">
            <Button
              className=""
              variant="outlined"
              color="secondary"
              onClick={handleToggleDialog}
            >
              Cancel
            </Button>

            <Button
              className=""
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
            >
              Send
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default InviteMember;
