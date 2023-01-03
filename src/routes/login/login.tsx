import { TextField, Button, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { store } from "../../store";
import { setUser } from "../../slices/user-slice";
import { redirect, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/api/authApiSlice";
import SetCredentials from "../../auth/handler";
import { useSnackbar } from "notistack";
import { errorHandler } from "../../helpers/error-handler";

export type TLogin = {
  userName: string;
  password: string;
};

const Login = () => {
  const {
    control,
    reset,
    formState: { isValid, isDirty, errors },
    handleSubmit: handleFormSubmit,
  } = useForm<TLogin>({ mode: "onChange" });
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [login, loginData] = useLoginMutation();

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    login(data)
      .unwrap()
      .then((payload) => {
        SetCredentials(payload);
        enqueueSnackbar("Welcome back, log in succesful!", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => errorHandler(err));
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
      <Box>
        <Typography variant="h5">Hello there, </Typography>
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <Controller
            name={"userName"}
            control={control}
            rules={{ required: "userName is required." }}
            render={({ field }) => (
              <TextField
                sx={{ width: "100%", m: 1 }}
                error={errors.userName ? true : false}
                helperText={errors?.userName?.message}
                id="outlined-multiline-static"
                placeholder="userName"
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
          <Button
            disabled={!isDirty || !isValid}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
