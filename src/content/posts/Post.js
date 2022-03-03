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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import { prominent } from "color.js";
import { getBlob, getStorage, ref } from "firebase/storage";

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

  useEffect(() => {
    prominent("https://dummyimage.com/300/09f/fff.png", {
      amount: 1,
      format: "hex",
    }).then((c) => {
      setImageColor(c);
    });
    if (picture) {
      const storage = getStorage();
      const imgRef = ref(storage, picture);
      console.log(imgRef);
      console.log(getBlob(imgRef));
      // setImgSrc(getBlob(imgRef));
      // getBlob(imgRef).then((e) => console.log(e));
    }
  }, [picture]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Card
        key={postID}
        sx={{
          maxWidth: 590,
          minWidth: 320,
          borderRadius: "15px",
          backgroundColor: "#f0f2f5",
        }}
      >
        {/* Add user avatar check */}
        <CardHeader
          sx={{ padding: "12px 15px" }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {/* Add settings tab */}
              <MoreVertIcon />
            </IconButton>
          }
          // Pull title and date posted
          title={userID}
          // subheader={timestamp.toDateString()}
        />
        {/* Add check if post is with picture */}
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
          <IconButton aria-label="like">
            <FavoriteIcon />
          </IconButton>
          <Typography variant="body">{likes.length}</Typography>
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          <Typography variant="body">{comments.length}</Typography>
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
          {comments &&
            comments.map((e) => {
              return (
                <CardContent key={e.userID}>
                  <Typography paragraph>{e.content}</Typography>
                </CardContent>
              );
            })}
        </Collapse>
      </Card>
    </>
  );
}
