import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Copyright } from "../common/copyright";

const CointainerDashboardInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DashboardInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  padding-left: 2%;
`;

const ContainerName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10%;
`;

const Name = styled.h1`
  font-family: "Audiowide", cursive;
  font-size: 62px;
  letter-spacing: 2px;
  margin: 0;
  line-height: 100%;
`;

const SubTitle = styled.p`
  margin: 0;
  line-height: 100%;
  font-size: 10px;
`;

const InformationDashboard = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 22px;
`;

const Icon = styled.i`
  font-size: 44px;
  padding-right: 12px;
  color: #1565c0;
`;

const BoldInformation = styled.span`
  font-weight: bold;
  padding-right: 12px;
`;

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get("email");
    const password = data.get("password");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

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
          <CointainerDashboardInfo>
            <DashboardInfo>
              <ContainerName>
                <Name>Koffee</Name>
                <SubTitle>
                  powered by <strong>Reactorzy</strong>
                </SubTitle>
              </ContainerName>
              <InformationDashboard>
                <Icon>
                  <i className="fas fa-mail-bulk"></i>
                </Icon>
                <BoldInformation>6420</BoldInformation>written posts
              </InformationDashboard>
              <InformationDashboard>
                <Icon>
                  <i className="fas fa-comments"></i>
                </Icon>
                <BoldInformation>526980</BoldInformation>written comments
              </InformationDashboard>
              <InformationDashboard>
                <Icon>
                  <i className="fas fa-users"></i>
                </Icon>
                <BoldInformation>11</BoldInformation> registered users
              </InformationDashboard>
            </DashboardInfo>
          </CointainerDashboardInfo>
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
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
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
