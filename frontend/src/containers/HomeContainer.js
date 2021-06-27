import React from 'react';
import Home from '../components/Home';
import MainMessage from '../components/MainMessage';
import Navbar from '../components/Navbar';

function HomeContainer() {
  return (
    <div>
      <Navbar />
      <MainMessage />
      <Home />
    </div>
  );
}

export default HomeContainer;
