import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { DialogAnimate } from "src/components/animate";
import CopyClipboard from "src/components/CoppyClipboard";

type PopUpCertificateType = {
  onClose: () => void,
  handleEdit: () => void,
  open: boolean,
  csr: string,
}

const PopUpCertificate = ({
  onClose,
  handleEdit,
  open,
  csr
}: PopUpCertificateType) => (
  <DialogAnimate sx={{
    width: 1000
  }} open={open} onClose={onClose} >
    <DialogTitle>Notification</DialogTitle>
    <DialogContent sx={{
      '&.MuiDialogContent-root': {
        overflowX: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
      }
    }}>
      <DialogContentText id="alert-dialog-description">
        Please go to website <a href="https://mfi.apple.com" target="_blank" rel="noreferrer">https://mfi.apple.com</a> then submit CSR to apple
      </DialogContentText>
      <CopyClipboard copyText={csr} />
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" color="inherit" onClick={onClose}>
        Cancel
      </Button>
      <LoadingButton type="submit" variant="contained" onClick={handleEdit}>
        Continue
      </LoadingButton>
    </DialogActions>
  </DialogAnimate >
)

export default PopUpCertificate