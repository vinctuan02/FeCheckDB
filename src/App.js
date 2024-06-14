import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './Pages/HomePage/HomePage.js';
import TestPage from './Pages/Test/TestPage.js';
import TestComponent from './Component/Test/TestComponent.js';
import TestComponent2 from './Component/Test/TestComponent2.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-component" element={<TestComponent />} />
        <Route path="/test-component2" element={<TestComponent2 />} />

        <Route path="/test-page" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
