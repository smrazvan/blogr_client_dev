import React from "react";
import ReadonlyEditor from "../../components/readonly-editor/ReadonlyEditor";
import { useGetPostQuery } from "../../features/api/postsApiSlice";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RawDraftContentState } from "draft-js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Button, Divider, TextField } from "@mui/material";
import UserCard from "../../components/user-card/user-card";
import Stack from "@mui/system/Stack";
import TInterest from "../../types/models/TInterest";
import PostInteractions from "../../components/post-interactions/post-interactions";
import ProfileImage from "../../components/user-card/profile-image";
import AvatarChip from "../../components/avatar-chip/avatar-chip";
import RenderInterests from "../../components/render-interests/render-interests";
import AddComment from "../../components/add-comment/add-comment";
import Comments from "../../components/comments/comments";
import ProtectedComponent from "../../components/protected-component/protected-component";
import { errorHandler } from "../../helpers/error-handler";
import { PostOptions } from "../../components/post-options/post-options";

export const View = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetPostQuery(Number(id));
  if (isLoading) return <h1>Loading</h1>;

  if (error) {
    errorHandler(error);
    return <p>Could not load content.</p>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box sx={{ flexBasis: "66%" }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {data?.title}
            </Typography>
            <Typography>{data?.creationDate}</Typography>
            <Stack direction="row" spacing={1}>
              <AvatarChip
                user={data?.user ? data.user : { userName: "deleted" }}
              />
              <RenderInterests
                interests={data?.interests ? data.interests : []}
              />
            </Stack>
            <ReadonlyEditor content={data?.content} />
            <Divider />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProtectedComponent>
              <PostInteractions
                postId={data?.id}
                isLikedByUser={data?.isLikedByUser}
              />
            </ProtectedComponent>
            <PostOptions post={data} />
          </Box>
          <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
            <AddComment post={data} />
            <Comments post={data} />
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flexBasis: "30%" }}>
          <UserCard user={data?.user} />
        </Box>
      </Box>
    </>
  );
};
