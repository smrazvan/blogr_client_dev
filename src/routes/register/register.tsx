import { TextField, Button, Typography, TextFieldProps } from "@mui/material";
import Box from "@mui/system/Box";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { store } from "../../store";
import { setUser } from "../../slices/user-slice";
import Select from "react-select";
import { redirect, useNavigate } from "react-router-dom";

import { Dayjs } from "dayjs";
import InterestsSelector, {
  TSelectInterest,
} from "../../components/interests-selector/interests-selector";
import { useRegisterMutation } from "../../features/api/authApiSlice";
import SetCredentials from "../../auth/handler";
import TInterest from "../../types/models/TInterest";
import TError from "../../types/models/TError";
import { useSnackbar } from "notistack";
import { errorHandler } from "../../helpers/error-handler";
export type TRegister = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  profileImageUrl: string;
  birthDate: string;
  interests?: TInterest[];
};

export type RegisterFromData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  profileImageUrl: string;
  birthDate: string;
  interests?: TSelectInterest[];
};

const Register = () => {
  const {
    control,
    reset,
    formState: { isValid, isDirty, errors },
    handleSubmit: handleFormSubmit,
  } = useForm<RegisterFromData>({ mode: "onChange" });
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [register, registerData] = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterFromData> = (data) => {
    let interests: TInterest[] = [];
    if (data.interests)
      interests = data?.interests?.map((interest: TSelectInterest) => {
        return {
          id: interest.value,
          name: interest.label,
        };
      });
    const body = {
      ...data,
      interests: interests,
    };
    console.log(body);
    register(body)
      .unwrap()
      .then((payload) => {
        SetCredentials(payload);
        console.log(payload);
        navigate("/");
      })
      .catch((err) => {
        errorHandler(err);
      });
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
                sx={{ width: 220, m: 1 }}
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
