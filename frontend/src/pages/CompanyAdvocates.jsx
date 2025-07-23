import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const CompanyAdvocates = () => {
  const navigate = useNavigate();
  const [advocates, setAdvocates] = useState();
  const [loading, setLoading] = useState(true);
  const getAdvocates = async () => {
      try {
        const response = await axios.get("https://blogs-ooi1.onrender.com/api/v1/companyAdvocates");
        setLoading(false);
        setAdvocates(response.data);
      } catch (error) {
        alert("Failed to fetch records");
      }
    }
  useEffect(() => {
    getAdvocates();
  }, [])
  async function deleteAdvocate(id) {
    try {
      const response = await axios.delete(`https://blogs-ooi1.onrender.com/api/v1/companyAdvocates/${id}`);
      alert("Advocated details deleted successfully!")
      setAdvocates();
      getAdvocates();
    } catch (error) {
      alert("Failed to delete advocate details");
    }
  }
  return (
    <>
      <button onClick={() => {
        navigate('/addCompanyAdvocate')
      }}>Add Advocate</button>
      {!advocates ?
        <div>Loading</div> :
        advocates.map((advocates, id) => {
          return (
            <div
              key={advocates._id}
              style={{
                border: '1px solid #ccc',
                padding: '16px',
                margin: '12px 0',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Name: {advocates.name}</h2>
              <p style={{ fontSize: '20px' }}>Expertise: {advocates.domain}</p>
              <p style={{ marginTop: '10px' }}>Experience: {advocates.experience}</p>
              <img src={advocates.imageURL} style={{ height: '200px', width: '150px', marginTop: '10px' }} />
              <div>
                <button style={{ fontSize: '20px', marginBottom: '8px' }} onClick={() => {
                  navigate(`/editAdvocate/${advocates._id}`, { state: advocates });
                }}>Edit Details</button>
                <button style={{ fontSize: '20px', marginBottom: '8px' }} onClick={() => deleteAdvocate(advocates._id)}>Remove Advocate</button>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default CompanyAdvocates