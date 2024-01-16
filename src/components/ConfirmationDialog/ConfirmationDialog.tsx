import { DialogTitle, Dialog, Grid, Button } from "@mui/material";

export interface ConfirmationDialogProps {
  question: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmationDialog = ({
  question,
  handleClose,
  handleConfirm,
  open,
}: ConfirmationDialogProps) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{question}</DialogTitle>
      <Grid container direction="row">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Delete</Button>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationDialog;
