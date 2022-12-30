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
import { MuiChipsInput, MuiChipsInputChip } from "mui-chips-input";
import { useState } from "react";
import TInterest from "../../types/models/TInterest";
import InterestsSelector, {
  TSelectInterest,
} from "../../components/interests-selector/interests-selector";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../features/hooks";

type UpdateFormData = {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  birthDate: string;
  interests: TSelectInterest[];
};

export const Profile = () => {
  const userData = useAppSelector((state) => state.user);
  const {
    control,
    reset,
    watch,
    formState: { isDirty, isValid, errors },
    handleSubmit: handleFormSubmit,
  } = useForm<UpdateFormData>({
    mode: "onBlur",
    defaultValues: {
      ...userData.user,
      birthDate: userData?.user?.birthDate.slice(0, 10),
      interests: userData?.user?.interests.map((interest: TInterest) => {
        return {
          value: interest.id,
          label: interest.name,
        };
      }),
    },
  });
  const onSubmit: SubmitHandler<UpdateFormData> = (data) => {};
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { width: "100%", m: 1 },
      }}
    >
      <Typography variant="h4">
        Hello there,{" "}
        {`${userData?.user?.firstName} ${userData?.user?.lastName}`}
      </Typography>
      <Avatar
        alt={userData?.user?.userName}
        src={userData?.user?.profileImageUrl}
        sx={{ width: 128, height: 128 }}
      />
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <Controller
          name={"email"}
          control={control}
          rules={{ required: "Email is required." }}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", m: 1 }}
              error={errors.email ? true : false}
              helperText={errors?.email?.message}
              id="outlined-multiline-static"
              placeholder="Email"
              {...field}
            />
          )}
        />
        <Controller
          name={"firstName"}
          control={control}
          rules={{ required: "Firstname is required." }}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", m: 1 }}
              error={errors.firstName ? true : false}
              helperText={errors?.firstName?.message}
              id="outlined-multiline-static"
              placeholder="Firstname"
              {...field}
            />
          )}
        />
        <Controller
          name={"lastName"}
          control={control}
          rules={{ required: "lastName is required." }}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", m: 1 }}
              error={errors.lastName ? true : false}
              helperText={errors?.lastName?.message}
              id="outlined-multiline-static"
              placeholder="Lastname"
              {...field}
            />
          )}
        />
        <Controller
          name={"bio"}
          control={control}
          rules={{ required: "bio is required." }}
          render={({ field }) => (
            <TextField
              sx={{ width: "100%", m: 1 }}
              error={errors.bio ? true : false}
              helperText={errors?.bio?.message}
              id="outlined-multiline-static"
              placeholder="Bio"
              multiline
              rows={4}
              {...field}
            />
          )}
        />
        <Controller
          name={"birthDate"}
          control={control}
          rules={{ required: "birthDate is required." }}
          render={({ field }) => (
            <TextField
              id="date"
              label="Birthdate"
              type="date"
              error={errors.birthDate ? true : false}
              helperText={errors?.birthDate?.message}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              {...field}
            />
          )}
        />
        <Controller
          name={"interests"}
          control={control}
          rules={{ required: "Interests are required." }}
          render={({ field }) => <InterestsSelector {...field} />}
        />
        <div>
          <Button
            variant="contained"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Update
          </Button>
        </div>
      </form>
    </Box>
  );
};
