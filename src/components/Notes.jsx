import React, { useContext, useEffect, useState } from "react";
import { Box, Modal, Button, TextField } from "@mui/material";
import NotesContext from "../context/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30rem",
  minHeight: "30rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Notes() {
  const { notes, getNotes, editNote } = useContext(NotesContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "general" });
  let navigate = useNavigate();

  const updateNote = (currentNote) => {
    setOpen(true);
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});

  };

  const onChange = (e) => {
    // console.log(e.target.value)
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    handleClose();
  }

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();

    }
    else
    {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      <Box>
        <h1>YOUR NOTES</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            rowGap: "3rem",
            columnGap: "3rem",
            padding: "2rem",
          }}
        >
          {notes.length===0 && 'No notes to display'}
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                // width: "30%",
              }}
            >
              <TextField
                onChange={onChange}
                name="etitle"
                id="title"
                label="Title"
                value={note.etitle}
                variant="outlined"
              />
              <TextField
                onChange={onChange}
                name="etag"
                id="tag"
                label="Tag"
                value={note.etag}
                variant="outlined"
              />
              <TextField
                onChange={onChange}
                name="edescription"
                id="description"
                label="Note"
                value={note.edescription}
                multiline
                rows={10}
                
              />
            </Box>
            <br />
            <Button onClick={handleClick} sx={{ marginRight: "1rem" }} variant="contained">
              Update Note
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default Notes;
