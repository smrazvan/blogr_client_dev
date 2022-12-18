import { Button, TextField, Typography } from "@mui/material";
import CustomEditor from "../../components/editor/editor";
import { EditorState, RawDraftContentState } from "draft-js";
import { useState, useEffect } from "react";
import { useAddPostMutation } from "../../features/api/postsApiSlice";
import Select from 'react-select';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CreateFormData = {
  title: string;
  caption: string;
  captionImageUrl: string;
  interests: object;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export const Create = () => {
  const { control, reset, watch, formState: {errors}, handleSubmit: handleFormSubmit} = useForm<CreateFormData>(
    {mode: "onBlur"}
  );
  const watchAllFields = watch();
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
  const onSubmit: SubmitHandler<CreateFormData> = data => console.log(data);

  useEffect(() => {
    console.log("-=======-")
    console.log(errors);
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    console.log("raw state");
    console.log(rawState);
    console.log(errors);
  }, [rawState]);
  return(
    <>
      <Typography variant="h5" gutterBottom>Let's hear what's on your mind today 😎</Typography>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <Controller
          name={"title"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({field}) => (
            <TextField sx={{width: "50%", "margin-bottom": "2rem"}}
              error={errors.title ? true : false}
              helperText={errors?.title?.message}
              id="outlined-required"
              label="Give it a title"
              {...field}
            />
          )}
        />
        
        <CustomEditor setRawState={setRawState}/>
        <Controller
          name={"captionImageUrl"}
          control={control}
          render={({field}) => (
            <TextField sx={{width: "50%", "margin-bottom": "2rem"}}
              required
              id="outlined-required"
              label="Thumbnail Url"
              {...field}
            />
          )}
        />
        <Controller
          name={"caption"}
          control={control}
          render={({field}) => (
            <TextField sx={{width: "50%", "margin-bottom": "2rem"}}
              required
              id="outlined-required"
              label="Short catch description"
              {...field}
            />
          )}
        />
        <Select
          defaultValue={[options[2], options[3]]}
          isMulti
          name="colors"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        
        
        <Button sx={{mt: 2}} type="submit" variant="contained">Create</Button>
      </form>
    </>
  )
}