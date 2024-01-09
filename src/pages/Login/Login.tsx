import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Input from "../../components/Input/Input";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();

  const handleLogIn = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  return (
    <Grid
      container
      direction="column"
      padding="65px 10px 10px"
      alignItems="center"
      gap={2}
    >
      <Typography variant="h3">Login</Typography>
      <Input
        title="Username"
        value={email}
        handleChange={setEmail}
        type="email"
      />
      <Input
        title="Password"
        value={password}
        handleChange={setPassword}
        type="password"
      />
      <Button onClick={handleLogIn} variant="outlined" color="inherit">
        Sign in
      </Button>
    </Grid>
  );
};

export default LoginPage;
