import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MuiChipsInput, MuiChipsInputChip } from 'mui-chips-input';
import { useState } from "react";


export const Profile = () => {
  const [chips, setChips] = useState<MuiChipsInputChip[]>(["hello", "you"])
  const handleChange = (newChips: MuiChipsInputChip[]) => {
    setChips(newChips)
  }
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { width: "100%", m: 1 },
      }}
    >
      <Avatar
        alt="Your name"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 128, height: 128 }}
      />
      <div>
        <Typography>Your profile</Typography>
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="First Name"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          defaultValue="Hello World"
        />
        <TextField
          id="outlined-multiline-static"
          label="Bio"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
      </div>
      <div>
        <Typography>Interests</Typography>
        <MuiChipsInput value={chips} onChange={handleChange} fullWidth={true}/>
      </div>
      <div>
        <Button variant="contained">Update</Button>
        <Button variant="contained" disabled>
          Cancel
        </Button>
      </div>
    </Box>
  );
};
