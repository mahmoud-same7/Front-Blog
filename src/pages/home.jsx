import { Box, Button, Stack, Typography } from "@mui/material";
import NavBar from "../components/Appbar";
import Post_Card from "../components/card";
import Footer from "../components/footer";




const Home = ({data}) => {
  return (
    
      <Box className="Home_page" sx={{ position: "relative" ,width:'100%' ,height:'100%' }}>
        <NavBar />
        {/* ------------------start slide Bar-------------------- */}
        <Box className="slide_Show">
          <Typography variant="div" component="div" color="primary">
            <Typography
              variant="p"
              component="p"
              color="#fff"
              sx={{ fontWeight: "bold", fontSize: "40px", mb: "6px" }}
            >
              Welcome
            </Typography>
            <Typography
              variant="span"
              component="span"
              color="#fff"
              sx={{ fontSize: "22px" }}
            >
              We hope you like the experience
            </Typography>
          </Typography>
        </Box>
        {/* ------------------end slide Bar------------------ */}
        {/* ------------------start part of posts------------------ */}
        <Box className="show_posts_part" pt={4} pb={4}>
          <Stack direction="row" flexWrap="wrap">
            {data.map((post, index) => {
              return <Post_Card key={index} post={post} />;
            })}
          </Stack>
        </Box>
        {/* ------------------end part of posts------------------ */}
        <Button
          sx={{
            width: "320px",
            display: "block",
            transition: "0.5s ease-in-out",
            m: "20px auto 0",
            pb:'40px',
            "&:hover": { fontSize: "15px" },
          }}
        >
          see All Posts
        </Button>
      </Box>
  );
};

export default Home;
