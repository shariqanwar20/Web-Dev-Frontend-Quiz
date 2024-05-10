import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
// import Counter from './components/counter';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Faq from './pages/Faq';
import Quiz from './pages/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/quiz" element={<Quiz />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
