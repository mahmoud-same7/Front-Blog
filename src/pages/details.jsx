import {
  Avatar,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import NavBar from "../components/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { data_to_detailes_page } from "../App";
import Footer from "../components/footer";
import { Delete, Edit, Update } from "@mui/icons-material";

const Details = () => {
  const [post, setpost] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()
  const data = useContext(data_to_detailes_page);
  useEffect(() => {
    const filterData = () => {
      const filtered = data?.filter((el) => {
        return el.id == parseInt(id);
      });
      setpost(filtered[0]);
      console.log(filtered[0]);
    };
    filterData();
  }, []);
  return (
    <Box className="post_detailes" position='relative'>
      <NavBar />
      <Box className="post_content" sx={{ m: "60px 0 0", p: "20px 10px" }}>
        <Stack direction="row" flexWrap="wrap" mb="30px">
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              p: "10px",
              boxShadow: "1px 1px 5px #999",
              borderRadius: "8px",
              bgcolor: "#fff",
            }}
          >
            <img width="100%" src={post?.img} alt="" />
          </Box>
          <Box className="post_text" pl="30px" pt="15px">
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {post?.user?.username}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="primary"
              pb="10px"
              pt="20px"
              sx={{ fontWeight: "bold" }}
            >
              {post?.title}
            </Typography>
            <Typography variant="body1" pb="10px">
              {post?.description}
            </Typography>
            <Typography variant="body1" pb="10px">
              {post?.createdAt}
            </Typography>
            <Typography
              variant="body1"
              pb="10px"
              color="primary"
              sx={{
                bgcolor: "#fff",
                p: "6px 10px",
                mt: "30px",
                borderRadius: "6px",
              }}
            >
              {post?.category}
            </Typography>
            <Typography variant="p" component='p' color='#999' mt='20px' fontWeight='bold'>10 Likes</Typography>
            <Stack direction='row' spacing={2} mt={3}>
              <IconButton>
                  <Delete sx={{color:"#fff" , bgcolor:'darkred' ,p:'4px',borderRadius:'4px'}}/>
              </IconButton>
              <IconButton onClick={()=>{ navigate(`/user/update-post/${post.id}`) }}>
                  <Edit sx={{color:"#fff" , bgcolor:'green' ,p:'4px',borderRadius:'4px'}}/>
              </IconButton>
            </Stack>
          </Box>
        </Stack>
        {/*-------------------- start create part of  comment-------------------  */}
        <Box className="Create_comment">
          <form method="post">
            <Stack direction="row" spacing={2} alignItems="end">
              <textarea
                name="comment"
                id="comment"
                cols="60"
                rows="2"
                placeholder="comment ..."
                style={{ padding: "10px" }}
              ></textarea>
              <Button
                type="submit"
                sx={{
                  bgcolor: "blue",
                  "&:hover": { bgcolor: "blue" },
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                comment
              </Button>
            </Stack>
          </form>
        </Box>
        <Box className="show_comment" mt={4}>
          <Box
            className="comment"
            sx={{
              bgcolor: "#fff",
              p: "10px",
              m: "20px 10px",
              fontWeight: "bold",
              width: { xs: "100%", md: "50%" },
              boxShadow:"1px 1px 4px #999",
              borderRadius:'6px'
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="p" component="p">
                Manar sameh
              </Typography>
            </Stack>
            <Typography variant="div" component="div" ml="40px" mt="10px">
              This post is very nice ^-^
            </Typography>
          </Box>
          <Box
            className="comment"
            sx={{
              bgcolor: "#fff",
              p: "10px",
              m: "20px 10px",
              fontWeight: "bold",
              width: { xs: "100%", md: "50%" },
              boxShadow:"1px 1px 4px #999",
              borderRadius:'6px'
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="p" component="p">
                Manar sameh
              </Typography>
            </Stack>
            <Typography variant="div" component="div" ml="40px" mt="10px">
              This post is very nice ^-^
            </Typography>
          </Box>
        </Box>
        {/*-------------------- end create part of  comment-------------------  */}
      </Box>
    </Box>
  );
};

export default Details;
