import React from "react";
import Main from "../components/Main";
import MainMessage from "../components/MainMessage";
import Navbar from "../components/Navbar";

function HomeContainer() {
  return (
    <div>
      <Navbar />
      <MainMessage />
      <Main />
    </div>
  );
}

export default HomeContainer;
