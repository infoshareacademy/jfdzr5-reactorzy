import { useState, useEffect } from "react";
import { useUserContext } from "../../services/user-context";
import { useParams } from "react-router-dom";
import "./userView.css";
import { doc, updateDoc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// import { storage } from "../../../../index";
import { storage } from "../../index";
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
  // user and detailsUser are the information of logged user
  // usersId are the list of Id of the all user registered in app
  // aboutUser are the current render information of the single user.
  const { user, usersId, detailsUser, setDetailsUser } = useUserContext();
  const params = useParams();
  const [aboutUser, setAboutUser] = useState(
    {
      name: "",
      technologies: "",
      about: "",
      userId: "",
    }
    //   // detailsUser
  );
  console.log(detailsUser);
  const [editMode, changeEditMode] = useState(false);
  const [avatarChanged, setAvatartChanged] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState("");
  const [currentAvatar, setCurrentAvatar] = useState("");

  const { name, technologies, about, avatar, momentaryAvatar } = detailsUser;

  let uid;

  const getDataFromFirebase = async (usero) => {
    const docRef = await doc(db, "userDetails", usero);
    const docSnap = await getDoc(docRef);
    setAboutUser({
      name: docSnap.data().name ? docSnap.data().name : "",
      technologies: docSnap.data().technologies
        ? docSnap.data().technologies
        : "",
      about: docSnap.data().about ? docSnap.data().about : "",
      avatar: docSnap.data().avatar ? docSnap.data().avatar : "",
      userID: usero,
    });
    console.log(aboutUser);
  };

  useEffect(() => {
    // getDataFromFirebase(params.userID);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        getDataFromFirebase(params.userID);
        console.log(params.userID);
        // console.log("keep user? Yes! :):):)");
      } else {
        // console.log("keep user? NO!!!!!!!!!!!");
      }
    });
  }, []);

  const handleChangeAboutMe = async (event) => {
    if (editMode) {
      setDetailsUser({
        ...detailsUser,
        [event.target.name]: event.target.value,
      });
      const userDetails = doc(db, "userDetails", user.uid);
      await updateDoc(userDetails, {
        ...detailsUser,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleEditMode = async () => {
    if (!editMode) {
      changeEditMode(true);
    } else if (editMode) {
      changeEditMode(false);
    }
  };


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
          setDetailsUser({
            ...detailsUser,
            avatar: url
          });
          console.log(detailsUser)
        });
      });
      changeAvatarInFirebase(event.target.files[0]);
      
  };

  const changeAvatarInFirebase = async (neew) => {
    const storageRef = ref(storage, `avatars/${user.uid}`);
    uploadBytes(storageRef, neew)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", neew);
        console.log(newAvatar)
        setNewAvatar(neew);
      })
  }

  console.log(uid);
  console.log(detailsUser);

  return user ? (
    <Paper elevation={3} sx={{ p: "20px" }}>
      <div className="profil-avatar-container">
        <AvatarContainer>
          <Avatar
            style={{ width: "300px", height: "300px" }}
            alt="avatar"
            src={momentaryAvatar ||
              ((user !== null && user.uid === params.userID) ||
              uid === params.userID
                ? detailsUser.avatar
                : aboutUser.avatar)
            }
          />
          {(user !== null && user.uid === params.userID) ||
          uid === params.userID ? (
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
              <input style={{ display: "none" }} id="changePhoto" type="file" onChange={handleChangeAvatar}/>
            </div>
          ) : null}
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
            value={
              (user !== null && user.uid === params.userID) ||
              uid === params.userID
                ? detailsUser.name
                : aboutUser.name
            }
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
              value={
                (user !== null && user.uid === params.userID) ||
                uid === params.userID
                  ? detailsUser.technologies
                  : aboutUser.technologies
              }
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
              value={
                (user !== null && user.uid === params.userID) ||
                uid === params.userID
                  ? detailsUser.about
                  : aboutUser.about
              }
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
        {(user !== null && user.uid === params.userID) ||
        uid === params.userID ? (
          <div>
            <Button
              sx={{ margin: "20px", width: "40px" }}
              variant={editMode ? "contained" : "outlined"}
              onClick={handleEditMode}
            >
              {editMode ? "Save" : "Edit"}
            </Button>
          </div>
        ) : null}
      </div>
    </Paper>
  ) : (
    <></>
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
