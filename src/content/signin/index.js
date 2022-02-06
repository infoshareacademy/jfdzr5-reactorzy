import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInForm from "./SignInForm";
import { useState } from "react";
import DashboardData from "./DashboardData";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  font-size: 20px;
  color: red;
  text-align: center;
`;

const theme = createTheme();

export default function SignInSide() {
  const [failedAuth, setFailedAuth] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={true}
          sm={4}
          md={7}
          sx={{
            backgroundColor: "#F0F2F5",
          }}
        >
          <DashboardData />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {failedAuth && (
              <ErrorContainer>
                You have entered incorrect email/password
              </ErrorContainer>
            )}
            <SignInForm setFailedAuth={setFailedAuth} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
