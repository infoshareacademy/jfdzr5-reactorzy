import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

const TitleInput = styled.textarea`
  width: 100%;
  height: 10%;
  border: none;
  background-color: inherit;
  font-size: 25px;
  resize: none;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: black;
  }
  text-align: center;
  margin: 10px 0 15px;
  color: black;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 60%;
  border: none;
  background-color: inherit;
  font-size: 20px;
  resize: none;
  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: black;
  }
`;

const style = {
  position: "absolute",
  height: "50%",
  minWidth: "300px",
  minHeight: "350px",
  width: "30%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#f0f2f5",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  outline: "none",
  padding: "15px 25px 25px",
};

const TextPost = ({
  open,
  setOpen,
  handleSubmit,
  setImageData,
  imageData,
  setImage,
}) => {
  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = (img) => {
        setImageData(img.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ fontSize: "30px" }}
        >
          Create a post
        </Typography>
        <div
          style={{
            border: "0.5px solid #a6a6a6",
            width: "100%",
            margin: "15px 0 0",
          }}
        />
        <form style={{ width: "100%", height: "100%" }} onSubmit={handleSubmit}>
          <TitleInput placeholder="Post title" required name="title" />

          <ContentInput placeholder="Post content" required name="content" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="upload-button">
              <input
                onChange={handleImageUpload}
                accept="image/*"
                id="upload-button"
                type="file"
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{ ml: "-70px" }}
                component="span"
              >
                <ImageIcon />
              </Button>
            </label>
            <label htmlFor="submit-button">
              <Button
                type="submit"
                id="submit-button"
                variant="contained"
                size="large"
                color="success"
                sx={{ ml: "10px", width: "150px" }}
              >
                Submit
              </Button>
            </label>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TextPost;
