import React, { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../Button/Button";

export interface ILogIn {
  handleClose: () => void;
}

const Login: React.FC<ILogIn> = ({ handleClose }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
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
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="login"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <h1>Login</h1>
        <input
          value={email}
          name="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          name="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button handleClick={handleLogIn} title="Sign in" />
          <Button handleClick={handleClose} title="Cancel" />
        </div>
        {/* <button onClick={handleLogIn} disabled={!email || !password}>
          Sign in
        </button>
        <button onClick={handleClose}>Cancel</button> */}
      </motion.div>
    </motion.div>
  );
};

export default Login;
