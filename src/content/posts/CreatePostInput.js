import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const InputContainer = styled.div`
  max-width: 560px;
  min-width: 320px;
  border-radius: 15px;
  height: 40px;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 12px 15px;
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
  return (
    <InputContainer>
      <Avatar sx={{ mr: "10px", cursor: "pointer" }} />
      <InputButton>
        <InputText>Start a post</InputText>
      </InputButton>
    </InputContainer>
  );
};
