import React, { useState } from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import aboutMeImg from "../../images/aboutMe.jpg";
import { useNavigate } from "react-router-dom";
import FollowMeBar from "../../components/FollowMeBar/FollowMeBar";
import { minWidth } from "../../constants/styleConstants";

import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import Button from "../Button/Button";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "../../components/LogIn/login.css";

//https://ubaimutl.github.io/react-portfolio/

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const matches = useMediaQuery(`(min-width:${minWidth})`);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();

  const handleLogIn = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          // ...
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
      direction={matches ? "row" : "column-reverse"}
      height={matches ? "100%" : "auto"}
      padding="65px 10px 10px"
    >
      <div className="login-container">
        <h1>Login</h1>
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
        <div className="button-container">
          <Button handleClick={handleLogIn} title="Sign in" />
          {/* <Button handleClick={handleClose} title="Cancel" /> */}
        </div>
      </div>
    </Grid>
  );
};

export default LoginPage;
