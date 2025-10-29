import '../App.css'
import {useRef, useState} from "react";
import {BACKEND_URL} from "../App.jsx";

export default function Upload() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    console.log('Selected files:', selectedFiles);
  }

  return (
    <>
      <h1>Upload</h1>
      <button onClick={() => fileInputRef.current.click()}>
        Select a file
      </button>

      <input
        multiple
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <ul>
        {files.map((file, index) => (
          <UploadItem key={index} file={file} />
        ))}
      </ul>
    </>
  )
}

function UploadItem({ file }) {
  const [buttonText, setButtonText] = useState('Upload');

  async function upload() {
    setButtonText('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setButtonText('Uploaded!');
      } else {
        setButtonText('Failed');
        console.error('Upload failed:', await response.text());
      }
    } catch (error) {
      setButtonText('Error');
      console.error('Upload error:', error);
    }

    setTimeout(() => setButtonText('Upload'), 2000);
  }

  return (
    <div className="download-item">
      <p className="text">{file.name}</p>
      <button onClick={upload}>{buttonText}</button>
    </div>
  );
}