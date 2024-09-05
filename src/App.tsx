// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'; 
import CreateProject from './pages/CreateProject'; 
import DisplayContent from './pages/DisplayContent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/display" element={<DisplayContent/>} />
      </Routes>
    </Router>
  );
};

export default App;
