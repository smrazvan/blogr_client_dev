import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TInterest from "../../types/models/TInterest";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";

const allInterests: TInterest[] = [
  {
    id: 1,
    name: "programming",
  },
  {
    id: 2,
    name: "cooking",
  },
  {
    id: 3,
    name: "psycology",
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

type ToggleInterest = {
  interests: string[];
  setInterests: (newInterests: string[]) => void;
};

const ToggleInterest = (props: ToggleInterest) => {
  const { interests, setInterests } = props;

  const handleInterets = (
    event: React.MouseEvent<HTMLElement>,
    newInterests: string[]
  ) => {
    setInterests(newInterests);
  };

  return (
    <>
      <Box sx={{ width: "70%", maxWidth: "600px", overflowX: "scroll" }}>
        <ToggleButtonGroup value={interests} onChange={handleInterets}>
          {allInterests.map((interest: TInterest) => {
            return (
              <ToggleButton value={interest.name} aria-label="bold">
                <Typography>{interest.name}</Typography>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </Box>
    </>
  );
};

export default ToggleInterest;
