import { Button, TextField, Typography } from "@mui/material";
import CustomEditor from "../../components/editor/editor";
import { EditorState, RawDraftContentState } from "draft-js";
import { useState, useEffect } from "react";
import { useAddPostMutation } from "../../features/api/postsApiSlice";
import Select from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../features/hooks";
import TPost from "../../types/models/TPost";

type CreateFormData = {
  title: string;
  caption: string;
  captionImageUrl: string;
  interests: {value: number; label: string;}[];
};

const options = [
  { value: 1, label: "cook" },
  { value: 2, label: "programming" }
];

export const Create = () => {
  const userData = useAppSelector(state => state.user);
  const {
    control,
    reset,
    watch,
    formState: { errors },
    handleSubmit: handleFormSubmit,
  } = useForm<CreateFormData>({
    mode: "onBlur",
    defaultValues: {
      //continue
    },
  });
  const watchAllFields = watch();
  const [rawState, setRawState] = useState<RawDraftContentState | undefined>();
  const [createPost, result] = useAddPostMutation();

  const handleSubmit = () => {
    const body = {
      userId: 1,
      title: "How toooo",
      content: JSON.stringify(rawState),
      caption: "test",
    };
    createPost(body);
  };
  const onSubmit: SubmitHandler<CreateFormData> = (data) => {
    const interests = data.interests.map((el : {value: number; label: string;}) => {
      return {
        id: el.value,
        name: el.label
      }
    })
    const body = {
      userId: userData.user.id,
      title: data.title,
      content: JSON.stringify(rawState),
      caption: data.caption,
      captionImageUrl: data.captionImageUrl,
      interests: interests
    }
    createPost(body);
  }

  useEffect(() => {
    console.log("-=======-");
    console.log(errors);
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    console.log("raw state");
    console.log(rawState);
    console.log(errors);
  }, [rawState]);
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Let's hear what's on your mind today 😎
      </Typography>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <Controller
          name={"title"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <TextField
              sx={{ width: "50%", "margin-bottom": "2rem" }}
              error={errors.title ? true : false}
              helperText={errors?.title?.message}
              id="outlined-required"
              label="Give it a title"
              {...field}
            />
          )}
        />

        <CustomEditor setRawState={setRawState} />
        <Controller
          name={"captionImageUrl"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <TextField
              error={errors.captionImageUrl ? true : false}
              helperText={errors?.captionImageUrl?.message}
              sx={{ width: "50%", "margin-bottom": "2rem" }}
              id="outlined-required"
              label="Thumbnail Url"
              {...field}
            />
          )}
        />
        <Controller
          name={"caption"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <TextField
              error={errors.caption ? true : false}
              helperText={errors?.caption?.message}
              sx={{ width: "50%", "margin-bottom": "2rem" }}
              id="outlined-required"
              label="Short catch description"
              {...field}
            />
          )}
        />
        <Controller
          name={"interests"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <Select
              defaultValue={[options[2], options[3]]}
              isMulti
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              {...field}
            />
          )}
        />
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          Create
        </Button>
      </form>
    </>
  );
};
