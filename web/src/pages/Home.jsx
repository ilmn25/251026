import '../App.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    function download() {
        navigate('/Download');
    }

    function upload() {
    }
    return (
        <>
            <h1>illu's File Hosting and Transfer System</h1>
            <div className="button-list">
                <button onClick={download}>
                    Download
                </button>
                <button onClick={upload}>
                    Upload
                </button>
            </div>
            <p className="comment">
                A Full Stack File Hosting Software made with React, JavaScript, etc.
            </p>
        </>
    )
}

