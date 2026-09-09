import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { signUpUser } from "../../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import colors from "../../../assets/colors";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const result = await dispatch(signUpUser(data));

    if (signUpUser.fulfilled.match(result)) {
      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(45deg, ${colors.primary}, ${colors.black})`,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              p: 4,
              borderRadius: 3,
            }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700 }}
                >
                  Create Account
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Sign up to access your client management dashboard
                </Typography>
              </Box>

              {error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Please enter a valid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        color="inherit"
                      />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <Divider><Typography variant="body2">OR</Typography></Divider>
                  <Button
                    onClick={() => navigate("/login")}
                    sx={{
                      mt: "14px !important",
                      color: colors.primary
                    }}
                  >
                    Already have an account?
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;