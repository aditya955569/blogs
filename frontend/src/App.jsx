import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import AllBlogs from "./pages/AllBlogs";
//https://blogs-ooi1.onrender.com/api/v1/blogs
const App = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlogs />} />
      <Route path="/addBlog" element={<AddBlog />} />
      <Route path="/editBlog/:id" element={<EditBlog />} />
    </Routes>
  </BrowserRouter>
  )
};



export default App;
