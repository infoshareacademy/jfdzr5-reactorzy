import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { CreatePostModal } from "./CreatePostModal";

const InputContainer = styled.div`
  max-width: 560px;
  min-width: 320px;
  width: 100%;
  border-radius: 15px;
  height: 40px;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 12px 15px;
  margin: 0 auto 10px;
  box-shadow: 2px 3px 5px grey;
`;

const InputButton = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 8px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const InputText = styled.span`
  padding-left: 5px;
  color: #333333;
`;

export const CreatePostInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <InputContainer>
        <Avatar sx={{ mr: "10px", cursor: "pointer" }} />
        <InputButton onClick={() => setOpen(true)}>
          <InputText>Start a post</InputText>
        </InputButton>
      </InputContainer>
      <CreatePostModal open={open} setOpen={setOpen} />
    </>
  );
};
