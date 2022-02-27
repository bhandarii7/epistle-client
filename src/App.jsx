import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NotesState";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </NoteState>
    </>
  );
}

export default App;
