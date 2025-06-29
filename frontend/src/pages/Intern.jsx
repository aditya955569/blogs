import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const Intern = () => {
    const [interns, setInterns] = useState();
    const [loading, setLoading] = useState(true);
    async function fetchData() {
            try {
                const response = await axios.get("https://blogs-ooi1.onrender.com/api/v1/interns");
                console.log(response);
                setInterns(response.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        }
    useEffect(() => {
            fetchData();
        }, [])   
  return (
    <>
      {!interns ? <>Loading.....</> :
            <>
                    {interns.map((intern, id) => {
                        return (
                            <div
                                key={intern._id}
                                className="card"
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '16px',
                                    margin: '12px 0',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{intern.name}</h2>
                                <p style={{ fontSize: '14px', color: '#555' }}>{intern.email}</p>
                                <p style={{ fontSize: '14px', color: '#555' }}>{intern.location}</p>
                                <p style={{ fontSize: '14px', color: '#555' }}>{intern.college}</p>
                                <p style={{ fontSize: '14px', color: '#555' }}>{intern.year}</p>
                                <a href={intern.resume} target='_blank'>Resume</a>
                            </div>
                        );
                    })}


                </>}
    </>
  )
}

export default Intern