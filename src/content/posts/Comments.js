import React, { useEffect, useState } from "react";
import { CardContent, CardHeader } from "@mui/material";
import { Typography } from "@mui/material";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";

const Comment = ({ content, userID, timestamp }) => {
  const db = getFirestore();
  const [userName, setUserName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  let date = "Now";
  const getDate = () => {
    try {
      date =
        timestamp.toDate().toDateString() +
        " " +
        (timestamp.toDate().getHours() < 10
          ? "0" + timestamp.toDate().getHours()
          : timestamp.toDate().getHours()) +
        ":" +
        (timestamp.toDate().getMinutes() < 10
          ? "0" + timestamp.toDate().getMinutes()
          : timestamp.toDate().getMinutes());
    } catch {
      date = "Now";
    }
  };
  getDate();
  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "userDetails", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(docSnap.data().name);
        if (docSnap.data().avatar) {
          setAvatar(docSnap.data().avatar);
        }
      }
    };
    fetchUserData();
  });
  return (
    <div>
      <CardHeader
        sx={{ ml: "15px", padding: 0 }}
        avatar={
          avatar ? (
            <NavLink to={`/user/${userID}`}>
              <Avatar src={avatar} aria-label="recipe" />
            </NavLink>
          ) : (
            <NavLink to={`/user/${userID}`}>
              <Avatar />
            </NavLink>
          )
        }
        title={
          <NavLink
            to={`/user/${userID}`}
            style={{
              textDecoration: "none",
              color: "#696969",
              fontWeight: 900,
              fontSize: "15px",
            }}
          >
            {userName}
          </NavLink>
        }
        subheader={date}
      />
      <CardContent
        key={userID}
        sx={{ padding: "5px 15px", paddingBottom: "15px!important" }}
      >
        <Typography
          paragraph
          style={{
            border: "1px solid grey",
            backgroundColor: "lightgrey",
            borderRadius: "20px",
            height: "100%",
            padding: "7px 12px",
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </div>
  );
};

export default Comment;
