import { useUserContext } from "../../../../services/user-context";
import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PageviewIcon from "@mui/icons-material/Pageview";
import { pink } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import validator from "validator";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../index";

const AvatarContainer = styled.div`
  display: flex;
  alig-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
`;

const profilAvatarContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "20px",
};

const SignupForm = ({ setErrorMessage }) => {
  const { user, detailsUser, setDetailsUser } = useUserContext();
  const { name, technologies, about, avatar } = detailsUser;

  const [avatarFile, setAvatarFile] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("");

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

  /* 
  const handleChangeAvatar = (event) => {
    setAvatarFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setCurrentAvatar(event.target.files[0].webkitRelativePath);
    console.log(currentAvatar);
    // console.log(avatarFile);
  };
*/

  const handleChangeAvatar = async (event) => {
    setAvatarFile(event.target.files[0]);
    const currentAvatartStoragePath = Math.floor(Math.random() * 1000000);
    console.log(currentAvatartStoragePath);

    const storageRef = ref(
      storage,
      `momentaryAvatars/${currentAvatartStoragePath}`
    );
    uploadBytes(storageRef, event.target.files[0])
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", event.target.files[0]);
      })
      .then(() => {
        getDownloadURL(
          ref(storage, `momentaryAvatars/${currentAvatartStoragePath}`)
        ).then((url) => {
          setCurrentAvatar(url);
        });
      });
  };

  const handleChangeAboutMe = (event) => {
    console.log(detailsUser);
    setDetailsUser({
      ...detailsUser,
      [event.target.name]: event.target.value,
    });
  };
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
                // Kamil - add document with user details in Firebase - 21/02/2022
                setDoc(doc(db, "userDetails", user.uid), {
                  name: data.get("username"),
                  userID: user.uid,
                  technologies: technologies,
                  about: about,
                });
                console.log(detailsUser);
                // collect of users ID
                updateDoc(doc(db, "users", "IdList"), {
                  IdList: arrayUnion(user.uid),
                });
                // updateDoc(doc(db, "userDetails", user.uid), {
                //   technologies: technologies,
                //   about: about,
                // });
                const storageRef = ref(storage, `avatars/${user.uid}`);
                uploadBytes(storageRef, avatarFile)
                  .then((snapshot) => {
                    console.log("Uploaded a blob or file!", avatarFile);
                    setAvatarFile(null);
                  })
                  .then(() => {
                    getDownloadURL(ref(storage, `avatars/${user.uid}`)).then(
                      (url) => {
                        console.log("dodano:", url);
                        setDetailsUser({
                          // ...detailsUser,
                          name: data.get("username"),
                          userID: user.uid,
                          technologies: technologies,
                          about: about,
                          avatar: url,
                        });
                        updateDoc(doc(db, "userDetails", user.uid), {
                          avatar: url,
                        });
                      }
                    );
                    navigate("/");
                  });
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
    <div style={profilAvatarContainer}>
      <AvatarContainer>
        <Avatar
          style={{ width: "300px", height: "300px" }}
          alt="avatar"
          src={currentAvatar || ""}
        />
        <div>
          <label
            htmlFor="changePhoto"
            style={{ cursor: "pointer" }}
            title="Add Photo"
          >
            <Avatar sx={{ bgcolor: pink[500] }}>
              <PageviewIcon />
            </Avatar>
          </label>
          <input
            style={{ display: "none" }}
            id="changePhoto"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleChangeAvatar}
          />
        </div>
      </AvatarContainer>
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
              multiline
              name="technologies"
              fullWidth
              id="technologies"
              label="My Technologies"
              value={technologies}
              onChange={handleChangeAboutMe}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              name="about"
              fullWidth
              id="about"
              label="About me"
              value={about}
              onChange={handleChangeAboutMe}
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
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
    </div>
  );
};

export default SignupForm;
