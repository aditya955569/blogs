import { useNavigate } from "react-router-dom"

const CompanyAdvocates = () => {
    const navigate=useNavigate();
    return (
    <>
    <button onClick={() => {
                        navigate('/addCompanyAdvocate')
                    }}>Add Advocate</button>
    </>
  )
}

export default CompanyAdvocates