import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { prominent } from "color.js";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useUserContext } from "../../services/user-context";
import { CreateCommentInput } from "./CreateCommentInput";
import Comment from "./Comments";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({
  postID,
  comments,
  likes,
  picture,
  technologies,
  timestamp,
  title,
  userID,
  content,
}) {
  const [expanded, setExpanded] = useState(false);
  const [imageColor, setImageColor] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [userName, setUserName] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const db = getFirestore();
  const { user } = useUserContext();
  const [likeClicked, setLikeClicked] = useState(
    likes.find(({ userID }) => userID === user.uid)
  );
  const [likesLength, setLikesLength] = useState(
    likes.length > 0 ? likes.length : null
  );

  const [commentsLength, setCommentsLength] = useState(
    comments.length > 0 ? comments.length : null
  );

  useEffect(() => {
    const storage = getStorage();

    if (picture) {
      try {
        const imgRef = ref(storage, picture);
        if (imgRef) {
          getDownloadURL(ref(storage, imgRef)).then((url) => {
            setImgSrc(url);
            prominent(url, {
              amount: 1,
              format: "hex",
            }).then((c) => {
              setImageColor(c);
            });
          });
        }
      } catch {
        const imgRef = ref(storage, picture);
        getDownloadURL(ref(storage, imgRef)).then((url) => {
          setImgSrc(url);
          prominent(url, {
            amount: 1,
            format: "hex",
          }).then((c) => {
            setImageColor(c);
          });
        });
      }
    }
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
  }, [picture, imgSrc, userID, db]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDislike = async () => {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likes: [
        ...likes.filter((e) =>
          Object.values(e).includes(user.uid) ? false : true
        ),
      ],
    });
    setLikeClicked(false);
    setLikesLength(likesLength - 1 > 0 ? likesLength - 1 : null);
  };

  const handleLike = async () => {
    const postRef = doc(db, "posts", postID);
    await updateDoc(postRef, {
      likes: [
        ...likes.filter((e) =>
          Object.values(e).includes(user.uid) ? false : true
        ),
        { userID: user.uid },
      ],
    });
    setLikeClicked(true);
    setLikesLength(likesLength + 1);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 590,
          minWidth: 320,
          borderRadius: "15px",
          backgroundColor: "#f0f2f5",
        }}
      >
        <CardHeader
          sx={{ padding: "12px 15px" }}
          avatar={
            avatar ? (
              <Avatar src={avatar} aria-label="recipe" />
            ) : (
              <Avatar>{userName ? userName.charAt(1) : "T"}</Avatar>
            )
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={userName}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: `${imageColor}`,
          }}
        >
          {picture && (
            <CardMedia
              component="img"
              sx={{
                maxHeight: "400px",
                minWidth: "300px",
                minHeight: "200px",
                height: "auto",
                width: "auto",
              }}
              image={imgSrc}
              alt=""
            />
          )}
        </div>
        <CardContent>
          {/* Main content, add check over length to spill to  */}
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {likeClicked ? (
            <IconButton aria-label="like" onClick={handleDislike}>
              <FavoriteIcon sx={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton aria-label="like" onClick={handleLike}>
              <FavoriteIcon />
            </IconButton>
          )}
          <Typography variant="body">{likesLength}</Typography>
          <IconButton aria-label="comment" onClick={handleExpandClick}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body">{commentsLength}</Typography>
          {/* Add share options */}

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          {comments && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CreateCommentInput
            postID={postID}
            comments={comments}
            setCommentsLength={setCommentsLength}
            commentsLength={commentsLength}
          />
          {comments.map((e) => (
            <Comment
              content={e.content}
              userID={e.userID}
              timestamp={e.timestamp}
            />
          ))}
        </Collapse>
      </Card>
    </>
  );
}
