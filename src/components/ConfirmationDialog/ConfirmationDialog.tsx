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
      <DialogTitle sx={{ background: "#242321", color: "#FFF" }}>
        {question}
      </DialogTitle>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        paddingBottom={2}
        sx={{ background: "#242321", color: "#FFF" }}
      >
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            color: "#0e0e0d",
            background: "#FFF",
            ":hover": {
              bgcolor: "#0e0e0d",
              color: "#FFF",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleConfirm}
          sx={{
            ":hover": {
              bgcolor: "#FFF",
              color: "#0e0e0d",
            },
          }}
        >
          Delete
        </Button>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationDialog;
