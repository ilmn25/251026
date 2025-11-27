import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {BACKEND_URL} from "../main.jsx";

export default function Gate() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const response = await fetch(`${BACKEND_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    if (response.status === 200) {
      sessionStorage.setItem("password", password); // store temporarily
      navigate('/Home');
    } else {
      console.log(response.status);
      setError("Invalid password");
    }
  }

  return (
    <>
      <h1>illu's File Hosting and Transfer System</h1>
      <div className="button-list">
        <input
          type="password"
          id="passwordInput"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>
          Enter
        </button>
      </div>
      {error && <p style={{color:"red"}}>{error}</p>}
      <p className="comment">
        A Full Stack File Hosting Software made with React, JavaScript, etc.
      </p>
    </>
  )
}
