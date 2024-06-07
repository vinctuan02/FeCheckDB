import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Table from './Component/table/Table.js';
import Hihi from './Pages/Hihi/HiHi.js';
import HomePage from './Pages/HomePage/HomePage.js';
import Task2 from './Pages/Task2/Task2.js';
import Test from './Pages/test/test.js';
import Test2 from './Pages/test/test2.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/hi" element={<Hihi />} />
        <Route path="/table" element={<Table />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
