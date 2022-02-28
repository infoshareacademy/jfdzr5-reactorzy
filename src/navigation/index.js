import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../services/user-context";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
// Firebase
import { signOut, getAuth } from "firebase/auth";

const Name = styled.h1`
  font-family: "Audiowide", cursive;
  font-size: 20px;
  letter-spacing: 2px;
  margin: 0;
  line-height: 100%;
`;

const settings = ["Profile", "Logout"];

export const Navigation = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  const { user, detailsUser, setDetailsUser } = useUserContext();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const auth = getAuth();
  const handleLogOut = () => {
    signOut(auth);
    setAnchorElUser(null);
    setDetailsUser({
      name: "",
      technologies: "",
      about: "",
      avatar: "",
      userID: "",
    });
  };

  return user ? (
    <>
      <div style={{ height: "85px", zIndex: "-999" }}></div>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Below is logo*/}
            <Typography
              onClick={handleLogoClick}
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                cursor: "pointer",
              }}
            >
              <Name>Koffee</Name>
            </Typography>

            {/* User menu on the right */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => {
                  if (setting === "Profile") {
                    return (
                      <MenuItem
                        key={setting}
                        onClick={handleCloseUserMenu}
                        component={Link}
                        to={`/user/${user.uid}`}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  } else if (setting === "Logout") {
                    return (
                      <MenuItem
                        key={setting}
                        onClick={handleLogOut}
                        component={Link}
                        to="/"
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  }
                })}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  ) : (
    <></>
  );
};
