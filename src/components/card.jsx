import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Button,
  Stack
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Delete, Favorite, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post_Card = ({post}) => {
    const [color , setColor] = useState(false)
    const navigate = useNavigate()
    const toggleColor = ()=> {
            setColor(!color)
    }
  return (
    <Box className="card" sx={{p:"10px" , m:"30px auto"}}>
      <Card  sx={{ maxWidth: 345,bgcolor:"#fff" , m:"10px !important" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={()=> {console.log(post.id)}}>
              <Delete sx={{'&:hover':{color:'darkred'}}} />
            </IconButton>
          }
          title={post.user.username}
          subheader={post.createdAt}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="p" component='p' mb={1} color="text.primary">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Stack direction="row" flexGrow={1} justifyContent='space-between' alignItems='center' >
          <Box>
          <IconButton  aria-label="add to favorites" onClick={toggleColor}>
            <Favorite sx={{color:color?"darkred":"gray"}} /> 
          </IconButton>
          <Typography sx={{fontSize:"16px" , fontWeight:"bold"}} variant="span" component="span">
                {post.likes.length}
            </Typography>
          </Box>
          <Button onClick={()=> {
                navigate(`/post/${post.id}`)
          }}>see more</Button>
          </Stack>
        </CardActions>
        
      </Card>
    </Box>
  );
};

export default Post_Card;
