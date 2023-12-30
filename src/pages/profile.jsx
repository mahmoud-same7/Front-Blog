import {
  Avatar,
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import NavBar from "../components/Appbar";
import { AccountBox, Cancel } from "@mui/icons-material";
import Post_Card from "../components/card";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";



const Porfile = ({ data ,user,token }) => {
  const [CurrentUser ,setCurrentUser] = useState(user)
  const form = useForm({
    defaultValues: {
      username: user.username,
      bio: user.bio,
      password: '',
    },
    mode: "onTouched",
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const refLayout = useRef();
  const closeLayOut = () => {
    refLayout.current.style.display = "none";
  };
  const openLayout = () => {
    refLayout.current.style.display = "flex";
  };
  const onsubmit = async (data1) => {
    console.log(token)
    const {data} = await axios.put(`http://localhost:8000/api/user/update/${user._id}`,data1,{
      headers : {
        'Authorization':token,
      },
    })
    setCurrentUser(data)
    localStorage.setItem('user',JSON.stringify(data))
    closeLayOut()
  };
  const translateDate = ()=> {
    const date = CurrentUser.createdAt.split('T')[0].split('-').reverse().join('-')
    return date
  }
  return (
    <div
      className="profile"
      style={{
        width: "100%",
        height: "100%",
        padding: "40px",
        position: "relative",
      }}
    >
      {/*--------------- start layout To Update Profile---------------------------- */}
      <Box className="layout_Update_profile" ref={refLayout}>
        <FormControl
          onSubmit={handleSubmit(onsubmit)}
          method="post"
          component="form"
          sx={{
            bgcolor: "#fff",
            p: "20px",
            width: { xs: "300px", md: "480px" },
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "30px",
              height: "30px",
            }}
            onClick={closeLayOut}
          >
            <Cancel sx={{ width: "30px", height: "30px", color: "darkred" }} />
          </IconButton>
          <Stack spacing={3}>
            <TextField
              id="username"
              label="username"
              type="text"
              variant="standard"
              {...register("username", { required: "this field is required" })}
              error={!!errors?.username}
              helperText={errors?.username?.message}
            />
            <TextField
              id="bio"
              label="bio"
              type="text"
              variant="standard"
              {...register("bio", { required: "this field is required" })}
              error={!!errors?.bio}
              helperText={errors?.bio?.message}
            />
            <TextField
              id="password"
              label="password"
              type="password"
              variant="standard"
              {...register("password", { required: "this field is required" })}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
            <Button type="submit">Update</Button>
          </Stack>
        </FormControl>
      </Box>
      {/*--------------- end layout To Update Profile---------------------------- */}
      <NavBar />
      <Box
        className="profile_part_one"
        m="50px auto 20px"
        p={4}
        sx={{
          bgcolor: "#fff",
          width: { xs: "100%", md: "80%" },
          boxShadow: "1px 1px 4px #999",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 70, height: 70 }}
          />
          <Typography variant="h5" component="h5">
            {CurrentUser.username}
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{ m: "15px auto", fontWeight: "bold" }}
          >
            bio : {CurrentUser.bio}
          </Typography>
          <Typography variant="p" component="p">
            Date Joined : 
            <Typography
              variant="span"
              component="span"
              color="primary"
              fontWeight="bold"
            >
              { translateDate()}
            </Typography>
          </Typography>
          <Button onClick={openLayout}>
            <AccountBox /> update profile
          </Button>
        </Stack>
      </Box>
      <Box className="profile_part_two">
        <Typography
          variant="h4"
          className="header_profile_post"
          p="40px 0 0"
          m="20px 10px"
          component="h4"
          sx={{ position: "relative" }}
        >
          My Posts
        </Typography>
      </Box>
      <Box className="show_My_posts" pt={4} pb={4}>
        <Stack direction="row" flexWrap="wrap">
          {data.map((post, index) => {
            return <Post_Card key={index} post={post} />;
          })}
        </Stack>
      </Box>
    </div>
  );
};
export default Porfile;
