import React from "react"
import { useLocation } from "react-router-dom"

const Success = () => {
    const { search } = useLocation();
    const parms = new URLSearchParams(search);
    const url = parms.get("url");
    const urlId = url.substring(17, 28)

    alert(`Your video is uploading successfully and this is the link\n ${url}`)

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
            <h4>Your video successfully uploaded to your account.</h4>

            <iframe id="inlineFrameExample" title="Inline Frame Example" width="500" height="300" className='my-3'
                src={`https://www.youtube.com/embed/${urlId}`}>
            </iframe>

            <a href={url} className="btn btn-danger btn-lg my-3">Play my video</a>
        </div>
    )
}

export default Success
