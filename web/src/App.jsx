import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Download from './pages/Download.jsx';
import Upload from "./pages/Upload.jsx";

export { BACKEND_URL } from "../../URL";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/Download" element={<Download />} />
          <Route path="/Upload" element={<Upload />} />
        </Routes>
    );
}

