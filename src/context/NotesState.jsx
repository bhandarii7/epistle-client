import Notescontext from "./NotesContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://epistle-server.onrender.com";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get all notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note

  const addNote = async (title, description, tag) => {
    //api call to add note
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json));
  };

  //delete a note

  const deleteNote = async (id) => {
    //api call to delete
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note

  const editNote = async (id, title, description, tag) => {
    //api call to edit note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    response.json();

    //logic to edit in client
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes);
  };

  return (
    <Notescontext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </Notescontext.Provider>
  );
};

export default NoteState;
