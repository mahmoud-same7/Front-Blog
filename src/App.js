import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home'
import Auth from './pages/auth'
import Details from "./pages/details";
import img from "./images/coffee.jpg";
import { createContext, useState } from "react";
import PostPage from "./pages/postPage";
import Profile from "./pages/profile";
import NewPost from "./pages/newPost";


const data = [
  {
    id: 1,
    img: img,
    title: "This is post",
    category: "coffe & tea",
    description: "This post is very important about coffe and tea",
    createdAt: "septemper 23 , 2023",
    likes: [1],
    user: {
      img: '',
      username: "mahmoud",
    },
  },
  {
    id: 5,
    img: img,
    title: "This is post",
    category: "coffe & tea",
    description: "This post is very important about coffe and tea",
    createdAt: "septemper 23 , 2023",
    likes: [1],
    user: {
      img: '',
      username: "mahmoud",
    },
  },
  {
    id: 2,
    img: img,
    title: "This is post",
    category: "coffe & tea",
    description: "This post is very important about coffe and tea",
    createdAt: "septemper 23 , 2023",
    likes: [1],
    user: {
      img: '',
      username: "mahmoud",
    },
  },
  {
    id: 3,
    img: img,
    title: "This is post",
    category: "coffe & tea",
    description: "This post is very important about coffe and tea",
    createdAt: "septemper 23 , 2023",
    likes: [1],
    user: {
      img: '',
      username: "mahmoud",
    },
  },
  {
    id: 4,
    img: img,
    title: "This is post",
    category: "coffe & tea",
    description: "This post is very important about coffe and tea",
    createdAt: "septemper 23 , 2023",
    likes: [1],
    user: {
      img: '',
      username: "mahmoud",
    },
  },
];

const ProtectedRouter = ({children , auth=false})=> {
    const login = localStorage.getItem('token') !== null || false
    if(!login && auth) {
        return <Navigate to={'/user/sign-in'} />
    }else if(login && ['/user/sign-in' ,'/user/sign-up'].includes(window.location.pathname)) {
      return <Navigate to={'/'} />
    }

    return children
}




export const data_to_detailes_page = createContext(null);

function App() {
  const [ user , setUser] = useState(JSON.parse(localStorage.getItem('user'))) 
  const [ token , setToken] = useState(localStorage.getItem('token')) 

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home data={data} />
      ),
    },
    {
      path: "user/sign-in",
      element:
        <ProtectedRouter>
          <Auth signUp={false} />
        </ProtectedRouter>
      ,
    },
    {
      path: "user/sign-up",
      element:
        <ProtectedRouter >
          <Auth signUp={true} />
        </ProtectedRouter>
      ,
    },
    {
      path: "user/profile/:id",
      element:
        <ProtectedRouter auth={true}>
          <Profile data={data.slice(0, 3)} user={user} token={token} />
        </ProtectedRouter>
      ,
    },
    {
      path: "user/create",
      element:
        <ProtectedRouter auth={true}>
            <NewPost update={false} user={user} />
        </ProtectedRouter>
      ,
    },
    {
      path: "user/Update-post/:id",
      element:
      <ProtectedRouter auth={true}>
        <NewPost update={true} />
      </ProtectedRouter>
      ,
    },
    {
      path: "/posts",
      element:
        <PostPage data={data} />
      ,
    },
    {
      path: "post/:id",
      element:
        <Details />
      ,
    },
  ]);
  return (
    <data_to_detailes_page.Provider value={data}>
      <div className="App" style={{ backgroundColor: "rgb(241, 241, 241)", width: "100%", height: "100%", position: 'relative' }}>
        <RouterProvider router={router} />
      </div>
    </data_to_detailes_page.Provider>
  );
}

export default App;
