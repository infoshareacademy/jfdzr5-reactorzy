import React, { useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { NavLink, useNavigate } from "react-router-dom";
import validator from "validator";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";

const SignupForm = ({ setErrorMessage }) => {
  const navigate = useNavigate();
  const db = getFirestore();
  const totalUsers = useRef(0);

  useEffect(() => {
    const totalUsersRef = doc(db, "users", "userCount");
    onSnapshot(totalUsersRef, (doc) => {
      totalUsers.current = doc.data().registered;
    });
  });

  console.log(totalUsers.current);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getFirestore();
    const auth = getAuth();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const username = data.get("username");
    const totalUsersRef = doc(db, "users", "userCount");

    // Perform signup validation
    const passCheck = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (username.length >= 4) {
      if (validator.isEmail(email)) {
        if (password.length >= 6) {
          if (passCheck.test(password)) {
            return createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                const user = userCredential.user;
                user.displayName = username;
                updateProfile(user, { displayName: username });
                console.log(user);
                navigate("/");
              })
              .then(() => {
                updateDoc(totalUsersRef, {
                  registered: totalUsers.current + 1,
                });
              })
              .catch((error) => {
                // nothing
              });
          }
          return setErrorMessage(
            "The password needs to have at least one number and one uppercase letter"
          );
        }
        return setErrorMessage(
          "The password needs to be at least 6 characters long"
        );
      }
      return setErrorMessage("Please provide a valid email");
    }
    return setErrorMessage(
      "The username needs to include at least 4 characters"
    );
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="username"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive follower updates via email."
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link variant="body2" component={NavLink} to="/">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupForm;
