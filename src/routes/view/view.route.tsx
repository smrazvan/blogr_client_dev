import React from "react";
import ReadonlyEditor from "../../components/readonly-editor/ReadonlyEditor";
import { useGetPostQuery } from "../../features/api/postsApiSlice";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { RawDraftContentState } from "draft-js";

export const View = () => {
  const { id } = useParams();

  const {data, error, isLoading} = useGetPostQuery(Number(id));
  if(isLoading) return <h1>Loading</h1>;

  if(error) return <h1>ERROR</h1>
  
  return (
  <>
    <Box>
      <Typography>{data?.title}</Typography>
      <Typography>{data?.creationDate}</Typography>
      <ReadonlyEditor content={data?.content}/>
    </Box>
  </>)
}