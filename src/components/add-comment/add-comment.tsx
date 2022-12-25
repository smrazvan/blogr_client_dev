import { Box, TextField, Button } from "@mui/material";
import TComment from "../../types/models/TComment";
import TPost from "../../types/models/TPost";
import { useAddPostCommentMutation } from "../../features/api/postsApiSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type AddComment = {
  post: TPost | undefined;
};

const AddComment = (props: AddComment) => {
  const { id } = props.post ? props.post : { id: 0 };

  const {
    control,
    reset,
    formState: { isValid, isDirty, errors },
    handleSubmit: handleFormSubmit,
  } = useForm<Partial<TComment>>({ mode: "onChange" });

  const [addComment, result] = useAddPostCommentMutation();

  const onSubmit: SubmitHandler<Partial<TComment>> = (data) => {
    const body = {
      id: id,
      userId: 1,
      content: data.content,
    };
    addComment(body);
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <Box>
        <Box>
          <Controller
            name={"content"}
            control={control}
            rules={{ required: "Content is required." }}
            render={({ field }) => (
              <TextField
                sx={{ width: "100%" }}
                error={errors.content ? true : false}
                helperText={errors?.content?.message}
                id="outlined-multiline-static"
                multiline
                rows={2}
                placeholder="Leave a comment"
                {...field}
              />
            )}
          />
        </Box>
        <Box>
          <Button
            disabled={!isValid || !isDirty}
            variant="contained"
            type="submit"
          >
            Comment
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AddComment;
