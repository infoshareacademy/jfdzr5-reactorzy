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
  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(db, "userDetails", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(docSnap.data().name);
        if (docSnap.data().avatar) {
          setAvatar(docSnap.data().avatar);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
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
              <Avatar>{userName ? userName.charAt(1) : "T"}</Avatar>
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
        subheader={
          timestamp.toDate().toDateString() +
          " " +
          (timestamp.toDate().getHours() < 10
            ? "0" + timestamp.toDate().getHours()
            : timestamp.toDate().getHours()) +
          ":" +
          (timestamp.toDate().getMinutes() < 10
            ? "0" + timestamp.toDate().getMinutes()
            : timestamp.toDate().getMinutes())
        }
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
            padding: "10px",
          }}
        >
          {content}
        </Typography>
      </CardContent>
    </div>
  );
};

export default Comment;
