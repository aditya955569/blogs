import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate=useNavigate();
  return (
    <div style={{justifyContent:'center',alignItems:'center'}}>
      <button onClick={()=>{
        navigate('/allBlogs')
      }}>Blogs</button>
      <button onClick={()=>{
        navigate('/interns')
      }}>Interns</button>
      <button onClick={()=>{
        navigate('/advocates')
      }}>Advocates</button>
      <button onClick={()=>{
        navigate('/companyAdvocates')
      }}>Company Advocates</button>
    </div>
  )
}

export default Landing