import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "../../../common/copyright";
import styled from "styled-components";
import { useState } from "react";
import SignupForm from "./SignupForm";

const theme = createTheme();

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  font-size: 20px;
  color: red;
  text-align: center;
`;

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {errorMessage && <ErrorContainer>{errorMessage}</ErrorContainer>}
          <SignupForm setErrorMessage={setErrorMessage} />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
