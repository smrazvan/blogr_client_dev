import { Typography } from "@mui/material";
import { useState } from "react";
import CustomEditor from "../../components/editor/editor";

export const Create = () => {
  
  return(
    <>
      <Typography>Let's hear what's on your mind today 😎</Typography>
      <CustomEditor />
    </>
  )
}