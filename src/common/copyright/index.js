import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/infoshareacademy/jfdzr5-reactorzy"
      >
        GitHub Repository
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
