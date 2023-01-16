import { Box, TextField, Button } from "@mui/material";

export const ChatPopup = () => {
  return (
    <Box
      sx={{
        zIndex: 2000,
        position: "fixed",

        padding: "20px",
        bottom: 0,
        right: 0,
        backgroundColor: "white",
        width: "300px",
        height: "350px",
        boxShadow: "-1px 1px 12px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>username</Box>
          <Box>X</Box>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "scroll" }}>messages</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignSelf: "flex-end",
          }}
        >
          <TextField
            label="Message"
            id="standard-size-normal"
            variant="standard"
          />
          <Button variant="contained">Send</Button>
        </Box>
      </Box>
    </Box>
  );
};
