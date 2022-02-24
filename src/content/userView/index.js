import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import PageviewIcon from "@mui/icons-material/Pageview";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import "./userView.css";
import { useUserContext } from "../../services/user-context";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../index";

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
  const { user } = useUserContext();
  const [editMode, changeEditMode] = useState(false);
  const [aboutUser, setAboutUser] = useState({
    name: "",
    technologies: "",
    about: "",
  });

  const { name, about, technologies } = aboutUser;

  const getDataFromFirebase = async (usero) => {
    const docRef = await doc(db, "userDetails", usero);
    const docSnap = await getDoc(docRef);
    setAboutUser({
      name: docSnap.data().name,
      technologies: docSnap.data().technologies,
      about: docSnap.data().about,
    });
  };

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
    console.log(editMode);
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
          }}
        >
          <TextField
            onChange={handleChangeAboutMe}
            name="name"
            variant="standard"
            fullWidth={true}
            value={name}
            inputProps={{
              style: {
                fontSize: 40,
                textAlign: "center",
                backgroundColor: editMode ? "rgb(232, 232, 232" : "inherit",
                readOnly: editMode ? false : true,
              },
            }}
          />
          <TextContainer>
            <Typography variant="h4" align="center">
              My technologies
            </Typography>
            <TextField
              onChange={handleChangeAboutMe}
              name="technologies"
              variant="standard"
              fullWidth={true}
              value={technologies}
              multiline
              inputProps={{
                style: {
                  textAlign: "center",
                  backgroundColor: editMode ? "rgb(232, 232, 232" : "inherit",
                  readOnly: editMode ? false : true,
                },
              }}
            />
          </TextContainer>
          <TextContainer>
            <Typography align="center" variant="h4">
              About me
            </Typography>
            <TextField
              onChange={handleChangeAboutMe}
              name="about"
              variant="standard"
              fullWidth={true}
              value={about}
              multiline
              inputProps={{
                style: {
                  textAlign: "center",
                  backgroundColor: editMode ? "rgb(232, 232, 232" : "inherit",
                  readOnly: editMode ? false : true,
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
