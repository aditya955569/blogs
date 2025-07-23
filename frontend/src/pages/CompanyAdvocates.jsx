import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const CompanyAdvocates = () => {
    const navigate=useNavigate();
    const [advocates,setAdvocates]=useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const getAdvocates=async()=>{
        try{
          const response=await axios.get("https://blogs-ooi1.onrender.com/api/v1/companyAdvocates");
          setLoading(false);
          setAdvocates(response.data);
          console.log(advocates)
        }catch(error){
          alert("Failed to fetch records");
        }
      }
      getAdvocates();
    },[])
    return (
    <>
    <button onClick={() => {
                        navigate('/addCompanyAdvocate')
                    }}>Add Advocate</button>
     {!loading?
     <div>Loading</div>:
     advocates.map((advocates,id)=>{
      return(
        <>

        </>
      )
     })}      
    </>
  )
}

export default CompanyAdvocates