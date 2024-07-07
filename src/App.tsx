import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './Components/UserForm';
import TableData from './Components/TableData';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/tabledata" element={< TableData/>} />
      </Routes>
    </Router>
  );
};

export default App;
