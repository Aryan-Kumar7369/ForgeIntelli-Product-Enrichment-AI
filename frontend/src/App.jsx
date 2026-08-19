import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Upload from './Upload';
import Catalog from './Catalog';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </Router>
  );
}
