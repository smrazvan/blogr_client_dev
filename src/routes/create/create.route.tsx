import { Button, TextField, Typography } from "@mui/material";
import CustomEditor from "../../components/editor/editor";
import { EditorState, RawDraftContentState } from "draft-js";
import { useState, useEffect } from "react";
import { useAddPostMutation } from "../../features/api/postsApiSlice";
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

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
      <Typography variant="h5" gutterBottom>Let's hear what's on your mind today 😎</Typography>
      <form>
        <TextField sx={{width: "50%", "margin-bottom": "2rem"}}
            required
            id="outlined-required"
            label="Give it a title"
          />
        <CustomEditor setRawState={setRawState}/>
        <Select
          defaultValue={[options[2], options[3]]}
          isMulti
          name="colors"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Button sx={{mt: 2}} variant="contained" onClick={handleSubmit}>Create</Button>
      </form>
    </>
  )
}