import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import AllBlogs from "./pages/AllBlogs";
import Intern from "./pages/Intern";
import Landing from "./pages/Landing";
import Advocates from "./pages/Advocates";
//https://blogs-ooi1.onrender.com/api/v1/blogs
const App = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/allBlogs" element={<AllBlogs />} />
      <Route path="/addBlog" element={<AddBlog />} />
      <Route path="/editBlog/:id" element={<EditBlog />} />
      <Route path="/interns" element={<Intern />} />
      <Route path="/advocates" element={<Advocates />} />
    </Routes>
  </BrowserRouter>
  )
};



export default App;
