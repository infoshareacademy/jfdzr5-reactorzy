import React, { useState } from "react";
import { Copyright } from "../../../../common/copyright";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";

const SentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  font-size: 20px;
  color: yellow;
  text-align: center;
`;

const ForgotPasswordForm = ({ setForgotPasswordState }) => {
  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLinkSent(true);
      })
      .catch((error) => {});
  };
  return (
    <>
      {linkSent && (
        <SentContainer>
          If there is a registered account under this e-mail we have sent the
          password reset link
        </SentContainer>
      )}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset password
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              style={{ cursor: "pointer" }}
              variant="body2"
              onClick={() => setForgotPasswordState(false)}
            >
              Sign In
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" component={NavLink} to="/sign-up">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
