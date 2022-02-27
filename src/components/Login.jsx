import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Box,
  Button,
  Typography,
  Input,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = (props) => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const host = 'https://epistle-server.herokuapp.com';


  const onChange = (e) => {
    // console.log(e.target.value)
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if(json.success)
    {
      //save the auth token and redirect
      localStorage.setItem('token',json.authToken);
      navigate("/");
      // props.showAlert("Logged in successfully","success");
    }
    else
    {
      // props.showAlert("Invalid cred","warning");
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
          <h2>Login</h2>
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
              placeholder="Email"
              sx={{ marginBottom: "1rem" }}
              fullWidth
              onChange={onChange}
              name='email'
              value={credentials.email}
            />
            <Input
              type="password"
              autoComplete="true"
              placeholder="Password"
              fullWidth
              onChange={onChange}
              name='password'
              value={credentials.password}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Box>
        <Typography>
          Do you have an account?
          <Link to={"/signup"}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
