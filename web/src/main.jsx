import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import Gate from "./pages/Gate.jsx";
import Home from "./pages/Home.jsx";
import Download from "./pages/Download.jsx";
import Upload from "./pages/Upload.jsx";

export { BACKEND_URL } from "../../URL";
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Gate />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Download" element={<Download />} />
            <Route path="/Upload" element={<Upload />} />
          </Routes>
        </HashRouter>
    </StrictMode>
);
