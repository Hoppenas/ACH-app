import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid, Button, TextField, Checkbox } from "@mui/material";

export interface IAddPaintingModal {
  handleClose: () => void;
}

const AddPaintingModal: React.FC<IAddPaintingModal> = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [isSold, setIsSold] = useState(false);
  const [price, setPrice] = useState(0);
  return (
    <motion.div
      className="backdrop"
      //   onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Grid
        container
        direction="column"
        gap={1}
        marginY={4}
        width="40%"
        height="40%"
        margin="70px auto"
        boxShadow="3px 5px 7px rgba(0, 0, 0, 0.5)"
        border="3px solid #FFF"
        bgcolor="#FFF"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          name="Pavadinimas"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name="Kaina"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
        <Checkbox
          name="sold"
          value={isSold}
          onChange={(event) => setIsSold(event.target.checked)}
        />
        <Grid item container width="fit-content" gap={2}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              height: "fit-content",
              color: "#FFF",
              background: "#0e0e0d",
              ":hover": {
                bgcolor: "#FFF",
                color: "#0e0e0d",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            //   variant="outlined"
            color="inherit"
            // onClick={() => navigate("/contacts")}
            sx={{
              height: "fit-content",
              color: "#FFF",
              background: "#0e0e0d",
              ":hover": {
                bgcolor: "#FFF",
                color: "#0e0e0d",
              },
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default AddPaintingModal;
