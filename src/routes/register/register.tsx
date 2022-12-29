import { TextField, Button, Typography, TextFieldProps } from "@mui/material";
import Box from "@mui/system/Box";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { store } from "../../store";
import { setUser } from "../../slices/user-slice";
import { redirect, useNavigate } from "react-router-dom";

import { Dayjs } from "dayjs";
export type TRegister = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  profileImageUrl: string;
  birthDate: string;
  // interests?: { value: number; label: string }[];
};

const Register = () => {
  const {
    control,
    reset,
    formState: { isValid, isDirty, errors },
    handleSubmit: handleFormSubmit,
  } = useForm<TRegister>({ mode: "onChange" });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<TRegister> = (data) => {
    // store.dispatch(
    //   setUser({
    //     username: "string",
    //     firstName: "string",
    //     lastName: "string",
    //     bio: "string",
    //     profileImageUrl: "",
    //     backgroundImageUrl: "",
    //     birthDate: "",
    //     id: 1,
    //   })
    // );
    navigate("/");
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to left, #ffefba, #ffffff)",
      }}
    >
      <Box sx={{ maxWidth: "500px" }}>
        <Typography variant="h5">Hello there, </Typography>
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <Controller
            name={"username"}
            control={control}
            rules={{ required: "Username is required." }}
            render={({ field }) => (
              <TextField
                sx={{ width: "100%", m: 1 }}
                error={errors.username ? true : false}
                helperText={errors?.username?.message}
                id="outlined-multiline-static"
                placeholder="Username"
                {...field}
              />
            )}
          />
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
            name={"password"}
            control={control}
            rules={{ required: "Password is required." }}
            render={({ field }) => (
              <TextField
                sx={{ width: "100%", m: 1 }}
                error={errors.password ? true : false}
                helperText={errors?.password?.message}
                id="outlined-multiline-static"
                placeholder="Password"
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
                placeholder="Password"
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
                placeholder="Password"
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
                placeholder="Password"
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
                label="Birthday"
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
          <Button
            disabled={!isDirty || !isValid}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
