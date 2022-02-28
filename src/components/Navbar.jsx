import React from "react";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function Navbar() {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 5px",
        backgroundColor: "#D8D2CB",
      }}
      maxWidth="ls"
      disableGutters
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>EPISTLE</h1>
        <Link to={"/"}>
          <Button
            sx={{ marginLeft: "1rem" }}
            variant="outlined"
            size="large"
            color="secondary"
          >
            Home
          </Button>
        </Link>
        <Link to={"about"}>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            sx={{ marginLeft: "10px" }}
          >
            About
          </Button>
        </Link>
      </Box>
      {!localStorage.getItem('token')?
      <Box>
        <Link to={'/login'} >
          <Button variant="contained" size="large">
            Login
          </Button>
        </Link>
        <Link to={'/signup'} >
          <Button variant="outlined" sx={{ marginLeft: "1rem" }} size="large">
            Signup
          </Button>
        </Link>
      </Box>
      :<Button onClick={handleLogout} variant="contained" size="large"  >Logout</Button>
      }
    </Container>
  );
}

export default Navbar;
