import { TextField, Button, Typography, TextFieldProps } from "@mui/material";
import Box from "@mui/system/Box";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { store } from "../../store";
import { setUser } from "../../slices/user-slice";
import Select from "react-select";
import { redirect, useNavigate } from "react-router-dom";

import { Dayjs } from "dayjs";
import InterestsSelector from "../../components/interests-selector/interests-selector";
import { useRegisterMutation } from "../../features/api/authApiSlice";
import SetCredentials from "../../auth/handler";
export type TRegister = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  profileImageUrl: string;
  birthDate: string;
  interests?: { value: number; label: string }[];
};
const options: { value: number; label: string }[] = [
  { value: 1, label: "cook" },
  { value: 2, label: "programming" },
];
const Register = () => {
  const {
    control,
    reset,
    formState: { isValid, isDirty, errors },
    handleSubmit: handleFormSubmit,
  } = useForm<TRegister>({ mode: "onChange" });
  const navigate = useNavigate();

  const [register, registerData] = useRegisterMutation();

  const onSubmit: SubmitHandler<TRegister> = (data) => {
    register(data)
      .unwrap()
      .then((payload) => {
        SetCredentials(payload);
        console.log(payload);
        navigate("/");
      })
      .catch((err) => console.log(err));
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
