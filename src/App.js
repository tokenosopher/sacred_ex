import React from 'react';
import {useState} from "react";
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core'



import './App.css';
import { connectors } from "./constants/connectors"
import Header from "./Components/Header/Header";
import Swap from "./Components/Swap/Swap";


import Footer from "./Components/Footer/Footer";
import Guidelines from "./Components/Guidelines/Guidelines";
import GratitudeMessage from "./Components/Messages/GratitudeMessage";

function App() {

    const { activate, deactivate, active, account, chainId, library } = useWeb3React();

    //
    const callLibrary = async() => {
        if (!library){
            return;
        }
        else {
            const amount = await library.getBalance(account)
            console.log(amount.toString())
        }

        // console.log("await library.getSigner()")
    }

    //
    // const [network, setNetwork] = useState(undefined);
    // const [verified, setVerified] = useState();
    //
    // const refreshState = () => {
    //     window.localStorage.setItem("provider", undefined);
    //     setNetwork("");
    //     setVerified(undefined);
    // };
    //
    // const disconnect = () => {
    //     refreshState();
    //     deactivate();
    // };

  return (
      <>
          <button onClick={() => { activate(connectors.coinbaseWallet)}}>Coinbase Wallet</button>
    <button onClick={() => { activate(connectors.walletConnect)}}>Wallet Connect</button>
    <button onClick={async () => { await activate(connectors.injected) }}>Metamask</button>
    <button onClick={async () => { await callLibrary()}}>Frame</button>

    <button onClick={() => {deactivate()}}>Disconnect</button>
        <div>Connection Status:  {active.toString()}</div>
        <div>Account: {account}</div>
          <div>{chainId}</div>

      <Main className="App">
        <Header/>
        <Guidelines/>
        <Swap/>
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