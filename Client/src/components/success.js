import React from "react"
import { useLocation } from "react-router-dom"

const Success = () => {

    const { search } = useLocation();
    const parms = new URLSearchParams(search);
    const url = parms.get("url");

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
            <h4>Your video successfully uploaded to your account.</h4>
            <a href={url} className="btn btn-danger btn-lg my-3">Watch your video</a>
        </div>
    )
}

export default Success
