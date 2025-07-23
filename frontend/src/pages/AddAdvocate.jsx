import React, { useState } from 'react'

const AddAdvocate = () => {
    const [name, setName] = useState("");
    const [expertise, setExpertise] = useState("");
    const [experience, setExperience] = useState(0);
    const [uploaded, setUploaded] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://blogs-ooi1.onrender.com/api/v1/companyAdvocates', {
                name,
                domain:expertise,
                imageURL,
                experience
            });
            if (response.status === 200 || response.status === 201) {
                alert('Advocate added successfully!');
                setName('');
                setExperience('');
                setExpertise('');
                setImageURL('');
                setUploaded(false);
            } else {
                alert('Something went wrong.');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding advocate.');
        }
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default'); // from Cloudinary

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dyxpbwa7d/image/upload',
                formData
            );

            const imageUrl = res.data.secure_url;
            setImageURL(imageUrl);
            setUploaded(true);
        } catch (err) {
            alert('Image upload failed');
            console.error(err);
        }
    };
    return (
        <>
            <div style={{ padding: "10px" }}>
                <label>Enter Name</label>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <label>Expertise</label>
                <div>
                    <input
                        type="text"
                        value={expertise}
                        onChange={(e) =>
                            setExpertise(e.target.value)
                        }
                    />
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <label>Experience</label>
                <div>
                    <input
                        type="number"
                        value={experience}
                        onChange={(e) =>
                            setExperience(e.target.value)
                        }
                    />
                </div>
            </div>
            <div style={{ padding: "10px" }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            {uploaded == true ?
                <div>
                    <img src={imageURL} style={{ height: '200px', width: '150px', marginTop: '10px' }} /></div> : <></>}
            <button style={{ padding: "10px" }} onClick={handleSubmit}>
                Add Advocate
            </button>
        </>
    )
}

export default AddAdvocate