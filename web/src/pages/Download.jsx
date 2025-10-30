import '../App.css'
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../App.jsx";

export default function Download() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/download`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(res => res.json())
      .then(data => {
        setFiles(data.files);
      })
      .catch(() => {
        console.error(`failed to fetch list at ${BACKEND_URL}/download`);
      });
  }, []);

  return (
    <>
      <h1>Download</h1>
      <div className="button-list">
        {files.map((file, index) => (
          <DownloadItem key={index} id={file}/>
        ))}
      </div>
    </>
  )
}

function DownloadItem({ id }) {
  const [buttonText, setButtonText] = useState('Download');

  function download() {
    setButtonText('Downloading...');
    const link = document.createElement('a');
    link.href = `${BACKEND_URL}/download?file=${encodeURIComponent(id)}`
    link.download = id;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setButtonText('Download');
  }

  return (
    <div className="download-item">
      <p className="text">{id}</p>
      <button onClick={download}>{buttonText}</button>
    </div>
  );
}