import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import "./userView.css";

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
  const [editMode, changeEditMode] = useState(false);

  const handleEditMode = () => {
    if (!editMode) {
      changeEditMode(true);
    } else if (editMode) {
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN5NS06Hx9iCXyqZft9AFCZHyJK-C5vloFn-m8PsE8w0so-W3yov3MG2krSS411e5m5fQ&usqp=CAU"
          />
        </AvatarContainer>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h2" align="center">
            Tonald Drump
          </Typography>
          <TextContainer>
            <Typography variant="h4" align="center">
              My technologies
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              variant={editMode ? "filled" : "outlined"}
              fullWidth={true}
              value="HTML, CSS, JavaScript, React, Firebase, Redux, Git, GitHub"
              multiline
              readOnly
              sx={{ borderColor: "yellow" }}
            />
          </TextContainer>
          <TextContainer>
            <Typography align="center" variant="h4">
              About me
            </Typography>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              variant="outlined"
              fullWidth={true}
              value=" Hi! I was a president of US. Some time ago I decided to change
                my way and become Front-End Developer."
              multiline
              readOnly
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
