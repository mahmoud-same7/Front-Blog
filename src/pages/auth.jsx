import {
  Box,
  InputAdornment,
  Button,
  TextField,
  Stack,
  Typography,
  Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'

import { AccountCircle, Email, Password } from "@mui/icons-material";
import { forwardRef, useState } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Auth = ({ signUp = true }) => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //   on submit login & register
  const onsubmit = async (data1) => {
    try {
      if(!signUp) {
        data1 = {
          email: data1.email,
          password: data1.password,
        }
      }
      const {data} = await axios.post(`http://localhost:8000/api/user/${signUp?'register':'login'}`,data1)
      console.log(data1)
      if(data.token) {
        localStorage.setItem('token' , data.token)
        localStorage.setItem('user' , JSON.stringify( data.user))
      }
      setSuccess(signUp?'success register , please login':'login success')
      setError('')
      setOpen(true);
      setTimeout(() => {
        signUp?navigate('/user/sign-in'): navigate(`/user/profile/${data?.user?._id}`)
      }, 1500);
    } catch (error) {
      setOpen(true);
      setError(error.response.data.msg)
    }
    
  };

  return (
    <Box 
    className="Auth_User" sx={{width:"100%",height:'100vh' , display:"flex" , alignItems:"center",justifyContent:"center"}}>
      <Box
        sx={{
          width: { xs: "320px", md: "400px" },
          p: "30px",
          backgroundColor: "#fff",
          boxShadow: "1px 1px 5px #999",
          borderRadius: "10px",
        }}
      >
        <Box className="title_Form" sx={{ textAlign: "center", mb: "20px" }}>
          <Typography
            variant="p"
            component="p"
            color="primary"
            sx={{ fontSize: "28px", fontWeight: "bold", mb: "5px" }}
          >
            welcom {!signUp && "Back"}
          </Typography>
          <Typography variant="span" sx={{ fontWeight: "bold" }}>
            {signUp ? "Sign up now" : "Sign in"} to get start
          </Typography>
        </Box>
        <form sx={{ width: "100%" }} onSubmit={handleSubmit(onsubmit)}>
          <Stack>
            {signUp && (
              <TextField
              autoComplete="off"
                sx={{ mb: "30px" }}
                id="username"
                label="User name"
                type="text"
                {...register("username", {
                  required: "username feild is required",
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                error={!!errors?.username}
                helperText={errors?.username?.message}
              />
            )}
            <TextField
            autoComplete="off"
              sx={{ mb: "30px" }}
              id="email"
              label="Email"
              type="email"
              {...register("email", {
                required: "email feild is required",
                minLength: {
                  value: 2,
                  message: "This length must more than or equal 2",
                },
                maxLength: {
                  value: 20,
                  message: "This length must less than or equal 20",
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
            <TextField
            autoComplete="off"
              sx={{ mb: "30px" }}
              id="Password"
              label="password"
              type="password"
              {...register("password", {
                required: "password feild is required",
                minLength: {
                  value: 8,
                  message: "This length must more than or equal 8",
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                mb: "10px",
                "&:hover": { backgroundColor: "blue" },
              }}
            >
              {signUp ? "sign up" : "sign in"}
            </Button>
            <Typography
              sx={{ textAlign: "center", fontWeight: "bold" }}
              variant="div"
              component="div"
            >
              {signUp ? "Already have an Account ? " : "Create new account ? "}
              <Typography
                variant="span"
                color="primary"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  navigate(`/user/${signUp ? "sign-in" : "sign-up"}`);
                }}
              >
                {signUp ? "sign in" : "sign up"}
              </Typography>
            </Typography>
          </Stack>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error?'error':'success'} sx={{ width: '100%' }}>
          {error?error:success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Auth;
