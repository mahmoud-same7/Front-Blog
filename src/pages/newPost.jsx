import {
  Box,
  FormControl,
  Stack,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NavBar from "../components/Appbar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const NewPost = ({ update , user }) => {
  
  const [category, setCategory] = useState('');
  const [cateList , setCateList] = useState([])
  const [image, setImage] = useState('');
  const form = useForm({
    mode: "onTouched",
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(()=>{
    console.log(user._id)
      const getCategory = async()=> {
        const {data} = await axios.get(`http://localhost:8000/api/category/`)
        setCateList(data)
      }
      getCategory()
  },[])

  const onsubmit = async(data1) => {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('title', data1.title)
      formData.append('description', data1.description)
      formData.append('category', category)
    try {
      const {data} = await axios.post('http://localhost:8000/api/post/',formData,{
        headers:{
          'Authorization' : localStorage.getItem('token')
        }
      })
       toast.success(data.msg,{
        theme:'colored'
      })
    } catch (error) {
      toast.error(error.response.date)
    }

    
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <NavBar />
      <ToastContainer theme="colored" position="top-center" />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl
          onSubmit={handleSubmit(onsubmit)}
          component="form"
          encType=" multipart/form-data"
          sx={{ width: { xs: "320px", md: "400px" }, p: "10px" }}
        >
          <Typography
            variant="p"
            component="p"
            color="primary"
            sx={{ mb: "40px", textAlign: "center", fontSize: "20px" }}
          >
            {update ? "Update post" : "Create new post"}
          </Typography>
          <Stack spacing={3}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                onChange={(e)=>{ 
                  const image = e.target.files[0]
                  setImage(image)
                }}
                type="file"
              />
            </Button>
            <TextField
              id="title"
              label="title"
              type="text"
              variant="standard"
              {...register("title", { required: "this field is required" })}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
            <TextField
              id="description"
              label="description"
              type="text"
              variant="standard"
              {...register("description", {
                required: "this field is required",
              })}
              error={!!errors?.description}
              helperText={errors?.description?.message}
            />
            <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              label = 'category'
              id="category"
              value={category}
              variant='standard'
              onChange={(e)=> {setCategory(e.target.value)}}
            >
              {cateList.map((cate,index)=> {
                return (<MenuItem key={index} value={cate.title}>{cate.title}</MenuItem>)
              })}
              
              
            </Select>
            </FormControl>
            <Button type="submit">{update ? "Update" : "Create"}</Button>
          </Stack>
        </FormControl>
      </Box>
    </Box>
  );
};

export default NewPost;
