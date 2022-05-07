import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Swap from "./Components/Swap/Swap";

import styled from 'styled-components';
import Footer from "./Components/Footer/Footer";
import Guidelines from "./Components/Guidelines/Guidelines";
import GratitudeMessage from "./Components/Messages/GratitudeMessage";

function App() {
  return (
      <Main className="App">
        <Header/>
        <Guidelines/>
        <Swap/>
        <GratitudeMessage/>
        <Footer/>
      </Main>
  );
}

const Main = styled.main`
  background-color: #25232c;
  display: flex;
  flex-direction: column;
  //make the size as big as the viewport:
  height: 100%;
  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;
  >*  {
    margin-bottom: 10px;
  }
`


export default App;