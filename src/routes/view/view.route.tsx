import React from "react";
import ReadonlyEditor from "../../components/readonly-editor/ReadonlyEditor";
import { useGetPostQuery } from "../../features/api/postsApiSlice";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RawDraftContentState } from "draft-js";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export const View = () => {
  const { id } = useParams();

  const {data, error, isLoading} = useGetPostQuery(Number(id));
  if(isLoading) return <h1>Loading</h1>;

  if(error) return <h1>ERROR</h1>
  
  return (
  <>
    <Box>
      <Typography variant="h4" gutterBottom>{data?.title}</Typography>
      <Typography>{data?.creationDate}</Typography>
      <Chip
        avatar={<Avatar alt={"ionel"} src="https://analystprep.com/cfa-level-1-exam/wp-content/uploads/2016/09/person-flat.png" />}
        label={"ionel"}
        variant="outlined"
      />
      <ReadonlyEditor content={data?.content}/>
    </Box>
  </>)
}