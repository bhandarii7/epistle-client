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
    if (note.title === "" || note.description === "" || note.tag === "") {
      alert("fill the fields");
      return;
    }
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

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          width: "30%",
          alignItems:'center'
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={onChange}
          name="title"
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={note.title}
        />
        <TextField
          onChange={onChange}
          name="tag"
          id="tag"
          label="Tag"
          variant="outlined"
          value={note.tag}
          fullWidth
        />
        <TextField
          onChange={onChange}
          name="description"
          id="description"
          label="Note"
          value={note.description}
          multiline
          rows={10}
          fullWidth
        />
        <Button sx={{width:'5rem'}} variant="outlined" type="submit">
          Add
        </Button>
      </form>
    </Box>
  );
}

export default AddNote;
