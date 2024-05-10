import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  let navigate = useNavigate();  // Hook to get the navigate function

  function goToAbout() {
    navigate('/about');  // Using navigate to change the route
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToAbout}>Go to About</button> 
    </div>
  );
}

export default Home;
