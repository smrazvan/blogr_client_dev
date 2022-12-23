import React from "react";
import ReadonlyEditor from "../../components/readonly-editor/ReadonlyEditor";
import { useGetPostQuery } from "../../features/api/postsApiSlice";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RawDraftContentState } from "draft-js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import UserCard from "../../components/user-card/user-card";
import Stack from "@mui/system/Stack";
import TInterest from "../../types/models/TInterest";
import PostInteractions from "../../components/post-interactions/post-interactions";
const interests : TInterest[] = [
  {
    id: 1,
    name: "Programming"
  },
  {
    id: 2,
    name: "Cooking"
  },
  {
    id: 3,
    name: "Psycology"
  },
  {
    id: 4,
    name: "Whatever"
  },
  {
    id: 5,
    name: "Something"
  }
];
export const View = () => {
  const { id } = useParams();

  const {data, error, isLoading} = useGetPostQuery(Number(id));
  if(isLoading) return <h1>Loading</h1>;

  if(error) return <h1>ERROR</h1>
  
  return (
  <>
    <Box sx={{
        display: "flex",
        gap: 4,
        justifyContent: "center",
        position: "relative",
      }}>
      <Box>
      <Box>
          <Typography variant="h4" gutterBottom>{data?.title}</Typography>
          <Typography>{data?.creationDate}</Typography>
          <Stack direction="row" spacing={1}>
            <Chip
                  avatar={<Avatar alt={"@ionel"} src="https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2016/09/person-flat.png" />}
                  label={"@ionel"}
                  variant="outlined"
                />
                {interests.map((interest: TInterest) => {
                  return <Chip label={interest.name} color="primary" variant="outlined" />
                })}
          </Stack>
          <ReadonlyEditor content={data?.content}/>
        </Box>
        <Box>
          <Divider />
          <PostInteractions />
        </Box>
        <Box>

        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box>
        <UserCard />
      </Box>
    </Box>
  </>)
}