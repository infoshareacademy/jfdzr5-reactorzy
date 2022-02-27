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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const [imageColor, setImageColor] = useState(0);
  const [imgRef, setImgRef] = useState("https://picsum.photos/400");

  useEffect(() => {
    prominent("https://dummyimage.com/300/09f/fff.png", {
      amount: 1,
      format: "hex",
    }).then((c) => {
      setImageColor(c);
    });
  }, []);

  console.log(imageColor);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(imageColor);
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
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        {/* Add check if post is with picture */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: `${imageColor}`,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxHeight: "400px",
              minWidth: "300px",
              minHeight: "200px",
              height: "auto",
              width: "auto",
            }}
            image="https://dummyimage.com/300/09f/fff.png"
            alt="Paella dish"
          />
        </div>
        <CardContent>
          {/* Main content, add check over length to spill to  */}
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* Add link to db likes */}
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {/* Add link to db comments */}

          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
          {/* Add share options */}

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}
