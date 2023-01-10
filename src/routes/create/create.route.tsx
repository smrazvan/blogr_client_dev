import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CustomEditor from "../../components/editor/editor";
import { EditorState, RawDraftContentState } from "draft-js";
import { useState, useEffect } from "react";
import { useAddPostMutation } from "../../features/api/postsApiSlice";
import Select from "react-select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../features/hooks";
import TPost from "../../types/models/TPost";
import InterestsSelector, {
  TSelectInterest,
} from "../../components/interests-selector/interests-selector";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { errorHandler } from "../../helpers/error-handler";
import React from "react";
import { ManageInterests } from "../../components/manage-interests/manage-interests";

type CreateFormData = {
  title: string;
  caption: string;
  captionImageUrl: string;
  interests: TSelectInterest[];
};

export const Create = () => {
  const userData = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    control,
    reset,
    watch,
    formState: { errors },
    handleSubmit: handleFormSubmit,
  } = useForm<CreateFormData>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      caption: "",
      captionImageUrl: "",
      interests: [],
    },
  });
  const watchAllFields = watch();
  const [rawState, setRawState] = useState<RawDraftContentState | undefined>();
  const [createPost, result] = useAddPostMutation();

  //create interest
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit: SubmitHandler<CreateFormData> = (data) => {
    const interests = data.interests.map(
      (el: { value: number; label: string }) => {
        return {
          id: el.value,
          name: el.label,
        };
      }
    );
    const body = {
      title: data.title,
      content: JSON.stringify(rawState),
      caption: data.caption,
      captionImageUrl: data.captionImageUrl,
      interests: interests,
    };
    createPost(body)
      .unwrap()
      .then((payload: TPost) => {
        enqueueSnackbar("Post created succesfully! :D", { variant: "success" });
        navigate(`/post/${payload.id}`);
      })
      .catch((err) => errorHandler(err));
  };

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
        <Typography>
          Not fitting to your post, create one
          <Box sx={{ display: "inline-block" }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              type="button"
            >
              here
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <ManageInterests />
            </Menu>
          </Box>
        </Typography>
        <Controller
          name={"interests"}
          control={control}
          rules={{ required: "Interests are required." }}
          render={({ field }) => <InterestsSelector {...field} />}
        />
        <Button sx={{ mt: 2 }} type="submit" variant="contained">
          Create
        </Button>
      </form>
    </>
  );
};
