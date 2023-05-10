import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';

interface confirmDeleteType {
  openDialog: boolean;
  handleToggleDialog: () => void;
  onHandleDelete: () => void;
}

const ConfirmDelete = (props: confirmDeleteType) => {
  const { openDialog, handleToggleDialog, onHandleDelete } = props;
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
      <DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0 min-w-200' }}>
        <Typography variant="h5" gutterBottom>
          Are you sure to delete this organization?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button className="" variant="outlined" color="secondary" onClick={handleToggleDialog}>
          Cancel
        </Button>

        <Button className="" variant="contained" color="secondary" onClick={onHandleDelete}>
          Sure !
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
