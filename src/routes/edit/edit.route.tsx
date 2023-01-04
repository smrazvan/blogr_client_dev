import { Button, TextField, Typography } from "@mui/material";
import CustomEditor from "../../components/editor/editor";
import { EditorState, RawDraftContentState, convertFromRaw } from "draft-js";
import { useState, useEffect } from "react";
import {
  useAddPostMutation,
  useUpdatePostMutation,
} from "../../features/api/postsApiSlice";
import Select from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../features/hooks";
import TPost from "../../types/models/TPost";
import InterestsSelector, {
  TSelectInterest,
} from "../../components/interests-selector/interests-selector";
import { useLocation, useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { errorHandler } from "../../helpers/error-handler";
import TInterest from "../../types/models/TInterest";

type EditFormData = {
  title: string;
  caption: string;
  captionImageUrl: string;
  interests: TSelectInterest[];
};

export const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const post: TPost = location.state.post;

  const {
    control,
    reset,
    watch,
    formState: { errors },
    handleSubmit: handleFormSubmit,
  } = useForm<EditFormData>({
    mode: "onBlur",
    defaultValues: {
      title: post?.title,
      caption: post?.caption,
      captionImageUrl: post?.captionImageUrl,
      interests: [
        ...post?.interests.map((interest: TInterest) => ({
          label: interest.name,
          value: interest.id,
        })),
      ],
    },
  });

  const [editPost, result] = useUpdatePostMutation();
  const [rawState, setRawState] = useState<RawDraftContentState | undefined>();

  if (!Boolean(post)) return <p>Could not load post</p>;

  const onSubmit: SubmitHandler<EditFormData> = (data) => {
    const interests = data.interests.map(
      (el: { value: number; label: string }) => {
        return {
          id: el.value,
          name: el.label,
        };
      }
    );
    const body = {
      ...data,
      id: post.id,
      content: JSON.stringify(rawState),
      interests: interests,
    };
    console.log(body);
    editPost(body)
      .unwrap()
      .then((payload: TPost) => {
        enqueueSnackbar("Post edited succesfully! :D", { variant: "success" });
        navigate(`/post/${payload.id}`);
      })
      .catch((err) => errorHandler(err));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Make it the best version 🤩
      </Typography>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <Controller
          name={"title"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <TextField
              sx={{ width: "50%", marginBottom: "2rem" }}
              error={errors.title ? true : false}
              helperText={errors?.title?.message}
              id="outlined-required"
              label="Give it a title"
              {...field}
            />
          )}
        />

        <CustomEditor setRawState={setRawState} content={post.content} />

        <Controller
          name={"caption"}
          control={control}
          rules={{ required: "Caption is required." }}
          render={({ field }) => (
            <TextField
              multiline
              rows={2}
              error={errors.caption ? true : false}
              helperText={errors?.caption?.message}
              sx={{ width: "100%", "margin-bottom": "2rem" }}
              id="outlined-required"
              label="Short catch description"
              {...field}
            />
          )}
        />

        <Controller
          name={"captionImageUrl"}
          control={control}
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <TextField
              error={errors.captionImageUrl ? true : false}
              helperText={errors?.captionImageUrl?.message}
              sx={{ width: "100%", "margin-bottom": "2rem" }}
              id="outlined-required"
              label="Thumbnail Url"
              {...field}
            />
          )}
        />

        <Controller
          name={"interests"}
          control={control}
          rules={{ required: "Interests are required." }}
          render={({ field }) => <InterestsSelector {...field} />}
        />
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          Edit
        </Button>
      </form>
    </>
  );
};
