import { Snackbar, Alert } from "@mui/material";
import { createRoot } from "react-dom/client";
import { MessageType } from "../../types/types";

interface NotifyProps {
  type: MessageType;
  message: string;
}
const showNotification = ({ type, message }: NotifyProps) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={true}
      sx={{ position: "fixed", zIndex: 1500 }}
    >
      <Alert severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  setTimeout(() => {
    document.body.removeChild(container);
  }, 5000);
};

export default showNotification;
