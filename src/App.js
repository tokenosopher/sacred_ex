import React from 'react';
import {useState, useEffect} from "react";
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core'



import './App.css';
import { connectors } from "./constants/connectors"
import Header from "./Components/Header/Header";
import Swap from "./Components/Swap/Swap";


import Footer from "./Components/Footer/Footer";
import Guidelines from "./Components/Guidelines/Guidelines";
import GratitudeMessage from "./Components/Messages/GratitudeMessage";
import ConnectModal from "./Components/Modals/ConnectModal";
import SelectCoinModal from "./Components/Modals/SelectCoinModal";

function App() {

    const { activate, deactivate, active, account, chainId, library } = useWeb3React();

    const [connectModal, setConnectModal] = useState(false);

    const [coinModal, setCoinModal] = useState(true);

    //
    const callLibrary = async() => {
        if (!library){
            return;
        }
        else {
            const amount = await library.getBalance(account)
            console.log(amount.toString())
        }
    }

  return (
      <>
      <ConnectModal functions={[connectModal, setConnectModal]}/>
      <SelectCoinModal functions={[coinModal, setCoinModal]}/>
      <Main className="App">
        <Header functions={[connectModal, setConnectModal]}/>
        <Guidelines/>
        <Swap functions={[connectModal, setConnectModal]}/>
        <GratitudeMessage/>
        <Footer/>
      </Main>
      </>
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