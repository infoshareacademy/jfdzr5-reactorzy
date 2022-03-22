import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInForm from "../SignInForm";
import DashboardData from "./DashboardData";
import ForgotPasswordForm from "../forgot-password";
import { useState, useEffect } from "react";
import { doc, getFirestore, onSnapshot, getDoc } from "firebase/firestore";

const theme = createTheme();

export default function SignInSide() {
  const db = getFirestore();
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [totalUsersRegistered, setTotalUsersRegistered] = useState();
  const [totalPosts, setTotalPosts] = useState();

  //Todo: add tracking for messages and posts written
  useEffect(() => {
    const totalUsersRef = doc(db, "users", "userCount");
    const postsRef = doc(db, "users", "postsMade");

    onSnapshot(totalUsersRef, (doc) => {
      setTotalUsersRegistered(doc.data().registered);
    });
    const getPosts = async () => {
      const postsSnap = await getDoc(postsRef);
      if (postsSnap.exists()) {
        setTotalPosts(postsSnap.data().posts);
      }
    };
    getPosts();
  });

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
          <DashboardData
            totalUsersRegistered={totalUsersRegistered}
            totalPosts={totalPosts}
          />
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
              {forgotPasswordState ? "Forgot Password" : "Sign in"}
            </Typography>
            {forgotPasswordState ? (
              <ForgotPasswordForm
                setForgotPasswordState={setForgotPasswordState}
              />
            ) : (
              <SignInForm setForgotPasswordState={setForgotPasswordState} />
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
