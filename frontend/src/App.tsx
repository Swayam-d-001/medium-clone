import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Fullblog } from "./pages/fullblog"
import { Signin } from "./pages/signin"
import { Signup } from "./pages/signup"
import { Blogs } from "./pages/blogs"
import { Postblog } from "./pages/postblog"


function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>} ></Route>
      <Route path='/signin' element={<Signin/>} ></Route>
      <Route path='/blog/post' element={<Postblog/>} ></Route>
      <Route path="/blog/bulk" element={<Blogs/>} ></Route>
      <Route path='/blog/:id' element={<Fullblog/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
