import React from "react";
import {TextareaAutosize,Button} from '@mui/material'
function About() {
  return (
    <div style={{ textAlign: "center",display:'flex',flexDirection:'column',alignItems:'center' }}>
      <h2>
        It is a note taking application which stores your notes securely and let
        you do much more.
      </h2>

      <h3>For any query contact us.</h3>
      
      <TextareaAutosize
        aria-label="minimum height"
        minRows={15}
        placeholder="Enter your query here."
        style={{ width: 800,marginBottom:'2rem' }}
      />
      <Button variant="contained"  >Send</Button>
    </div>
  );
}

export default About;
