import { useState, useEffect } from "react";
import { useUserContext } from "../../services/user-context";
import { useParams } from "react-router-dom";
import "./userView.css";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../index";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PageviewIcon from "@mui/icons-material/Pageview";
import styled from "styled-components";
import { pink } from "@mui/material/colors";

const TextContainer = styled.div`
  margin-bottom: 10px;
  flex-grow: 1;
`;

const AvatarContainer = styled.div`
  display: flex;
  alig-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const UserProfile = () => {
  const { user, usersId } = useUserContext();
  const params = useParams();
  const [aboutUser, setAboutUser] = useState({
    name: "",
    technologies: "",
    about: "",
    userId: "",
  });
  const [editMode, changeEditMode] = useState(false);

  const { name, technologies, about } = aboutUser;

  let uid;

  const getDataFromFirebase = async (usero) => {
    const docRef = await doc(db, "userDetails", usero);
    const docSnap = await getDoc(docRef);
    setAboutUser({
      name: docSnap.data().name,
      technologies: docSnap.data().technologies,
      about: docSnap.data().about,
      userId: docSnap.data().userID,
    });
  };

  useEffect(() => {
    // getDataFromFirebase(params.userID);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        getDataFromFirebase(params.userID);
        // console.log("keep user? Yes! :):):)");
      } else {
        // console.log("keep user? NO!!!!!!!!!!!");
      }
    });
  }, []);

  const handleChangeAboutMe = async (event) => {
    if (editMode) {
      setAboutUser({
        ...aboutUser,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleEditMode = async () => {
    if (!editMode) {
      changeEditMode(true);
    } else if (editMode) {
      const userDetails = doc(db, "userDetails", user.uid);
      await updateDoc(userDetails, {
        name: name,
        technologies: technologies ? technologies : "",
        about: about ? about : "",
      });
      changeEditMode(false);
    }
    // console.log(editMode);
  };

  console.log(uid);

  return (
    <>
      {" "}
      <h1>
        Budujemy od nowa
        {(user !== null && user.uid === params.userID) || uid === params.userID
          ? "właściwy"
          : "obcy"}
      </h1>
    </>
  );
};

/* 

export const UserProfile = () => {
  const [editMode, changeEditMode] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getDataFromFirebase(uid);
        // console.log("keep user? Yes! :):):)");
      } else {
        // console.log("keep user? NO!!!!!!!!!!!");
      }
    });
  }, []);

  const handleChangeAboutMe = async (event) => {
    if (editMode) {
      setAboutUser({
        ...aboutUser,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleEditMode = async () => {
    if (!editMode) {
      changeEditMode(true);
    } else if (editMode) {
      const userDetails = doc(db, "userDetails", user.uid);
      await updateDoc(userDetails, {
        name: name,
        technologies: technologies ? technologies : "",
        about: about ? about : "",
      });
      changeEditMode(false);
    }
    // console.log(editMode);
  };

  return (
    <Paper elevation={3} sx={{ p: "20px" }}>
      <div className="profil-avatar-container">
        <AvatarContainer>
          <Avatar
            style={{ width: "300px", height: "300px" }}
            alt="avatar"
            src=""
          />

          <div>
            <label
              htmlFor="changePhoto"
              style={{ cursor: "pointer" }}
              title="Change Photo"
            >
              <Avatar sx={{ bgcolor: pink[500] }}>
                <PageviewIcon />
              </Avatar>
            </label>
            <input style={{ display: "none" }} id="changePhoto" type="file" />
          </div>
        </AvatarContainer>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "500px",
          }}
        >
          <TextField
            onChange={handleChangeAboutMe}
            name="name"
            variant="standard"
            fullWidth={true}
            value={name}
            placeholder="provide information"
            inputProps={{
              style: {
                fontSize: 32,
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: editMode ? "rgb(232, 232, 232" : "inherit",
                readOnly: editMode ? false : true,
                cursor: "default",
              },
            }}
          />
          <TextContainer>
            <Typography
              variant="h6"
              align="center"
              sx={{ color: "rgba(0, 0, 0, 0.38)", fontWeight: "600" }}
            >
              My technologies
            </Typography>
            <TextField
              className="TextField"
              onChange={handleChangeAboutMe}
              name="technologies"
              variant="standard"
              fullWidth={true}
              value={technologies}
              multiline
              disabled={editMode ? null : true}
              placeholder="provide information"
              inputProps={{
                style: {
                  textAlign: "center",
                  backgroundColor: editMode ? "rgb(232, 232, 232" : "inherit",
                  readOnly: editMode ? false : true,
                  cursor: "default",
                },
              }}
            />
          </TextContainer>
          <TextContainer>
            <Typography
              align="center"
              variant="h6"
              sx={{ color: "rgba(0, 0, 0, 0.38)", fontWeight: "600" }}
            >
              About me
            </Typography>
            <TextField
              onChange={handleChangeAboutMe}
              name="about"
              variant="standard"
              fullWidth={true}
              value={about}
              multiline
              disabled={editMode ? null : true}
              placeholder="provide information"
              inputProps={{
                style: {
                  textAlign: "center",
                  backgroundColor: editMode ? "rgb(232, 232, 232" : "inherit",
                  readOnly: editMode ? false : true,
                  cursor: "default",
                },
              }}
            />
          </TextContainer>
        </div>
        <div>
          <Button
            sx={{ margin: "20px", width: "40px" }}
            variant={editMode ? "contained" : "outlined"}
            onClick={handleEditMode}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
    </Paper>
  );
};
 */
