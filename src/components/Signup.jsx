import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Input,
  Button,
  Typography,
  Box,
} from "@mui/material";

const Signup = (props) => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#398AB9" };
  const btnstyle = { margin: "8px 0" };
  const host = "https://epistle-server.herokuapp.com";

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const onChange = (e) => {
    // console.log(e.target.value)
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });
    const json = await response.json();
    //save the auth token and redirect
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid cred", "warning");
    }
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar
            sx={{ height: "3rem", width: "3rem" }}
            style={avatarStyle}
          ></Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "48%",
            rowGap: "2rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Input
              onChange={onChange}
              placeholder="Name"
              name="name"
              sx={{ marginBottom: "1rem" }}
              fullWidth
              type="text"
            />
            <Input
              placeholder="Email"
              sx={{ marginBottom: "1rem" }}
              fullWidth
              name="email"
              onChange={onChange}
              type="email"
            />
            <Input
              sx={{ marginBottom: "1rem" }}
              placeholder="Password"
              fullWidth
              name="password"
              onChange={onChange}
              required
              type="password"
              autoComplete="true"
            />
            <Input
              placeholder="Confirm Password"
              fullWidth
              name="cpassword"
              onChange={onChange}
              required
              type="password"
              autoComplete="true"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Sign up
            </Button>
          </form>

          <Typography>
            Already have an account?
            <Link to={"/login"}>Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Signup;
