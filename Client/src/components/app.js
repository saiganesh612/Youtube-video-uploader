import { React, useState } from "react"
import axios from "axios"

const App = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        file: null
    })

    const handleChange = e => {
        const value = e.target.name === "file" ? e.target.files[0] : e.target.value;

        setForm({
            ...form,
            [e.target.name]: value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const videoData = new FormData();
        videoData.append("videoFile", form.file)
        videoData.append("title", form.title)
        videoData.append("description", form.description)

        const response = await axios.post("/upload", videoData);
        console.log(response.data);
    }

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>

            <div className="row">
                <div className="col-8 offset-2 alert alert-warning" style={{ borderRadius: '1em' }}>
                    <p style={{ marginBottom: 0 }}>
                        <i className="fas fa-exclamation-triangle" /> &nbsp;
                        Time taken to upload the video to your Youtube Channel depends on the size
                        of the video that you are giving as input.
                    </p>
                </div>
            </div>

            <div className="row" align="center">
                <h1><i className="fab fa-youtube" style={{ color: "#dc3545" }}></i> Upload any video</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating my-3">
                        <input onChange={handleChange} type="text" className="form-control" id="title"
                            placeholder="Title" name="title" required />
                        <label htmlFor="title" className="form-label">Title</label>
                    </div>
                    <div className="form-floating my-3">
                        <textarea onChange={handleChange} type="text" className="form-control" id="description"
                            placeholder="Description" style={{ height: '150px' }} name="description" required />
                        <label htmlFor="description" className="form-label">
                            Give a brief description about your video...
                        </label>
                    </div>
                    <div className="my-3">
                        <input onChange={handleChange} accept='video/mp4' className="form-control"
                            type="file" placeholder="Add video file" name="file" id="formFile" required />
                    </div>
                    <div className="row" align="center">
                        <button type="submit" className="btn btn-danger btn-lg col-10 offset-1">Upload video</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App;
