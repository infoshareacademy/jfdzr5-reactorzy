import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { useUserContext } from "../../services/user-context";
import { NavLink } from "react-router-dom";

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

const InputText = styled.input`
  padding-left: 5px;
  color: #333333;
  resize: none;
  border: none;
  width: 100%;
  &:focus-visible {
    outline: none;
  }
  font-size: 15px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const CreateCommentInput = ({
  postID,
  comments,
  setCommentsLength,
  avatar,
  userName,
  userID,
  commentsList,
  setCommentsList,
}) => {
  const db = getFirestore();
  const { user, detailsUser } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      comments: [
        ...comments,
        {
          content: formData.get("content"),
          timestamp: new Date(),
          userID: user.uid,
        },
      ],
    });
    setCommentsLength(comments.length + 1);
    commentsList.push({
      content: formData.get("content"),
      timestamp: new Date(),
      userID: user.uid,
    });
    setCommentsList(commentsList);
  };
  return (
    <>
      <InputContainer>
        {detailsUser.avatar ? (
          <NavLink to={`/user/${userID}`}>
            <Avatar src={detailsUser.avatar} aria-label="recipe" />
          </NavLink>
        ) : (
          <NavLink to={`/user/${userID}`}>
            <Avatar />
          </NavLink>
        )}
        <InputButton onSubmit={handleSubmit}>
          <Form>
            <InputText name="content" placeholder="Write a comment..." />
          </Form>
        </InputButton>
      </InputContainer>
    </>
  );
};
