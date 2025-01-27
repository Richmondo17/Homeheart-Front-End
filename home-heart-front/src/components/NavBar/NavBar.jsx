import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    color: "#333",
  },
  title: {
    fontFamily: "Poppins, sans-serif",
    color: "#7693B0",
    fontSize: "40px",
    fontWeight: 600,
    textDecoration: "none",
  },
  navLinksContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    "& > *": {
      margin: theme.spacing(0, 2),
      fontWeight: "bold",
      color: "#668",
    },
  },
  navLinks: {
    color: "#7693B0",
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "28px",
    textTransform: "uppercase",
  },
  avatar: {
    backgroundColor: "#f50057",
  },
  navBarButtonsContainer: {},
  navBarButtons: {
    backgroundColor: "#7693B0",
    color: "#FFF",
    fontFamily: "Intern, sans-serif",
    marginLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#4777b8",
    },
  },
}));

const NavBar = ({ loggedIn, user, setUser, setLoggedIn, setLoginError }) => {
  const classes = useStyles();
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // console.log("the avatar is", user.avatar);
      setAvatarUrl(user.avatar);
    }
  }, []);
  // console.log("user id in nav", id);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    setUser(null);
    setLoginError("");
    navigate("/");
  };

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to="/"
        >
          HomeHeart
        </Typography>
        <div className={classes.navLinksContainer}>
          <Button className={classes.navLinks} component={Link} to="/">
            Home
          </Button>
          <Button className={classes.navLinks} component={Link} to="/AboutUs">
            About Us
          </Button>
          <Button
            className={classes.navLinks}
            component={Link}
            to={`/recommendations/${id}`}
          >
            Matches
          </Button>
          <Button
            className={classes.navLinks}
            component={Link}
            to={`/upcoming_appointments/${id}`}
          >
            Appointments
          </Button>

          <Button className={classes.navLinks} component={Link} to="/resources">
            Resources
          </Button>
        </div>
        {loggedIn ? (
          <>
            <Button
              className={classes.navBarButtons}
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <IconButton color="inherit" aria-label="User Account">
              <Avatar src={avatarUrl}></Avatar>
            </IconButton>
          </>
        ) : (
          <div className={classes.navBarButtonsContainer}>
            <Button
              className={classes.navBarButtons}
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              className={classes.navBarButtons}
              color="inherit"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
