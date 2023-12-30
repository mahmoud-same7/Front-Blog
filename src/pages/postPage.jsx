import { Box, Stack,InputLabel, MenuItem,FormControl,Select, Pagination} from "@mui/material";
import NavBar from "../components/Appbar";
import { useState } from "react";
import Post_Card from "../components/card";

const PostPage = ({data}) => {
    const [category, setcategory] = useState('');

  const handleChange = (event) => {
    setcategory(event.target.value);
    console.log(event.target.value)
  };

  return (
    <div className="Post_Page" style={{width:'100%',height:'100%'}}>
      <NavBar />
      <Box className="filter_posts" mt={6} p={2}>
        <Stack direction="row" sx={{justifyContent:{xs:'center' , md:'start'}}}>
          <Box sx={{ width: '300px' }} m={3}>
            <FormControl sx={{ width: '300px' }}>
              <InputLabel id="demo-simple-select-label">category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={10}>programming</MenuItem>
                <MenuItem value={20}>nature</MenuItem>
                <MenuItem value={30}>tea&caffe</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Box>
      <Box className="show_All_Posts" pt={3} pb={4}>
          <Stack direction="row" flexWrap="wrap">
            {data.map((post, index) => {
              return <Post_Card key={index} post={post} />;
            })}
          </Stack>
      </Box>
      <Stack spacing={2} justifyContent='center' alignItems="center" pt={3} pb={4}>
      <Pagination count={6} color="primary" onChange={(e,value)=> {console.log(value)}} />
    </Stack>
    </div>
  );
};

export default PostPage;
