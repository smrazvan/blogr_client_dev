import { Button, Typography } from "@mui/material";
import CustomEditor from "../../components/editor/editor";
import { EditorState, RawDraftContentState } from "draft-js";
import { useState, useEffect } from "react";
import { useAddPostMutation } from "../../features/api/postsApiSlice";
import TPost from "../../types/models/TPost";

export const Create = () => {
  const [rawState, setRawState] = useState<RawDraftContentState | undefined>();
  const [createPost, result] = useAddPostMutation();

  const handleSubmit = () => {
    const body = {
      userId: 1,
      title: "How toooo",
      content: JSON.stringify(rawState),
      caption: "test"
    };
    createPost(body);
  }


  useEffect(() => {
    console.log("raw state");
    console.log(rawState);
  }, [rawState]);
  return(
    <>
      <Typography>Let's hear what's on your mind today 😎</Typography>
      <CustomEditor setRawState={setRawState}/>
      <Button variant="contained" onClick={handleSubmit}>Create</Button>
    </>
  )
}