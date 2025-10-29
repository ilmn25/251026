import '../App.css'
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../App.jsx";

export default function Download() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/download`)
      .then(res => res.json())
      .then(data => {
        setFiles(data.files);
      })
      .catch(() => {
        console.error('Failed to fetch file list!');
      });
  }, []);

  return (
    <>
      <h1>Download</h1>
      <div className="button-list">
        {files.map((file) => (
          <DownloadItem id={file}/>
        ))}
        {/*<DownloadItem id={"test.t xt"}></DownloadItem>*/}
        {/*<DownloadItem id={"test.txt"}></DownloadItem>*/}
        {/*<DownloadItem id={"test.txt"}></DownloadItem>*/}
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