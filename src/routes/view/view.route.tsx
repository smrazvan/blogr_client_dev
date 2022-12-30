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
const interests: TInterest[] = [
  {
    id: 1,
    name: "Programming",
  },
  {
    id: 2,
    name: "Cooking",
  },
  {
    id: 3,
    name: "Psycology",
  },
  {
    id: 4,
    name: "Whatever",
  },
  {
    id: 5,
    name: "Something",
  },
];
export const View = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetPostQuery(Number(id));
  if (isLoading) return <h1>Loading</h1>;

  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box>
          <Box>
            <Typography variant="h4" gutterBottom>
              {data?.title}
            </Typography>
            <Typography>{data?.creationDate}</Typography>
            <Stack direction="row" spacing={1}>
              <AvatarChip
                user={data?.user ? data.user : { userName: "deleted" }}
              />
              <RenderInterests interests={interests} />
            </Stack>
            <ReadonlyEditor content={data?.content} />
          </Box>
          <Box>
            <Divider />
            <ProtectedComponent>
              <PostInteractions />
            </ProtectedComponent>
          </Box>
          <Box>
            <AddComment post={data} />
            <Divider />
            <Comments post={data} />
          </Box>
          <Divider orientation="vertical" flexItem />
        </Box>
        <Box>
          <UserCard user={data?.user} />
        </Box>
      </Box>
    </>
  );
};
