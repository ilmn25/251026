import '../App.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1>illu's File Hosting and Transfer System</h1>
      <div className="button-list">
        <button onClick={() => navigate('/Download')}>
          Download
        </button>
        <button onClick={() => navigate('/Upload')}>
          Upload
        </button>
      </div>
      <p className="comment">
        A Full Stack File Hosting Software made with React, JavaScript, etc.
      </p>
    </>
  )
}

