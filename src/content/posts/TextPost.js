import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function TextPost() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <CardHeader
          sx={{ p: "0", pb: "5px" }}
          avatar={<Avatar sx={{ mr: "-5px" }} />}
          title={
            <span>
              <Typography
                sx={{ fontSize: 14, fontWeight: "bold", pt: "7px" }}
                color="text.secondary"
                gutterBottom
              >
                User
              </Typography>
              <Typography
                sx={{ fontSize: 12, mt: "-5px" }}
                color="text.secondary"
                gutterBottom
              >
                Time added
              </Typography>
            </span>
          }
        ></CardHeader>
        <Typography variant="h5" component="div">
          Title
        </Typography>
        <Typography variant="body2">content</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
