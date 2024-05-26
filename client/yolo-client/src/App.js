import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import UpdateReminder from './UpdateReminder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reminder/:id" element={<UpdateReminder />} />
    </Routes>
  );
}

export default App;
