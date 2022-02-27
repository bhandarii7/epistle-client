import React, { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import NotesContext from "../context/NotesContext";

function AddNote() {
  const { addNote } = useContext(NotesContext);
  const initialNote = {
    title: "",
    description: "",
    tag: "",
  };
  const [note, setNote] = useState(initialNote);
  const onChange = (e) => {
    // console.log(e.target.value)
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>ADD A NOTE</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          width: "30%",
        }}
      >
        <TextField
          onChange={onChange}
          name="title"
          id="title"
          label="Title"
          variant="outlined"
          value={note.title}
        />
        <TextField
          onChange={onChange}
          name="tag"
          id="tag"
          label="Tag"
          variant="outlined"
          value={note.tag}
        />
        <TextField
          onChange={onChange}
          name="description"
          id="description"
          label="Note"
          value={note.description}
          multiline
          rows={10}
        />
      </Box>
      <br />
      <Button onClick={handleSubmit} variant="outlined" type="submit">
        Add
      </Button>
    </Box>
  );
}

export default AddNote;
