import React,{useContext} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesContext from "../context/NotesContext";

function NoteItem(props) {
  const { note,updateNote } = props;
  const {deleteNote } = useContext(NotesContext);
  const d = new Date(note.date);

  const date = `Last updated: ${d.toLocaleString({hour:'numeric',minute:'numeric',day:'numeric',month:'long'})}`;
  
  return (
    <Card sx={{ maxWidth: 345,minWidth:300 }}>
      <CardHeader title={note.title} subheader={date}  />
      <CardContent>
        <Typography sx={{overflow:'clip',height:'5rem'}} variant="body2" color="text.secondary">
          {note.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={()=>{updateNote(note)}} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={()=>{deleteNote(note._id)}} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NoteItem;
