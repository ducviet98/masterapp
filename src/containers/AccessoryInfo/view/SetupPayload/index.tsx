import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import QRCode from 'qrcode.react';

function SetupPayload({
  openDialog,
  data,
  handleToggleDialog,
}: {
  openDialog: boolean;
  handleToggleDialog: () => void;
  data: string;
}) {
  return (
    <Dialog open={openDialog} onClose={handleToggleDialog} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <QRCode id="qrcode" value={data} size={290} level={'H'} includeMargin={true} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default SetupPayload;
