import React from 'react';
import {useState, useEffect} from "react";
import styled from 'styled-components';

import Header from "./Components/Header/Header";
import Swap from "./Components/Swap/Swap";
import Footer from "./Components/Footer/Footer";
import Guidelines from "./Components/Guidelines/Guidelines";
import GratitudeMessage from "./Components/Messages/GratitudeMessage";
import ConnectModal from "./Components/Modals/ConnectModal";
import SelectCoinModal from "./Components/Modals/SelectCoinModal";
import SwapSettingsModal from "./Components/Modals/SwapSettingsModal";
import {useSelector} from "react-redux";
import {ethers} from 'ethers';
import {useWeb3React} from "@web3-react/core";

import {useDispatch} from "react-redux";
import {
    setAllowance,
    setAllowanceAndBalance
} from "./features/activeTokenNumbers/activeTokenNumbers";


function App() {

    const dispatch = useDispatch();

    const { active, account, library} = useWeb3React();

    const [activeTokenAttributes, setActiveTokenAttributes] = useState();

    const [connectModal, setConnectModal] = useState(false);

    const [coinModal, setCoinModal] = useState(false);

    const [settingsModal, setSettingsModal] = useState(false);

    //this gets the token list from the redux store:
    const tokenList = useSelector((state) => state.tokenList)

    //this retrieves the active token from the redux store:
    const tokenOne = useSelector((state) => state.tokenOne)

    const tokenTwo = useSelector((state) => state.tokenTwo)

    //use effect that updates the active token attributes whenever the active token changes:
    //if both tokens are matic, then it switches to the default - gratitude coin
    useEffect(() => {
        if (tokenOne.value.symbol !== 'MATIC') {
            setActiveTokenAttributes(tokenOne.value)
        }
        else if (tokenTwo.value.symbol !== 'MATIC') {
            setActiveTokenAttributes(tokenTwo.value)
        }

        else {
            setActiveTokenAttributes(tokenList.value[1])
        }

    }, [tokenOne, tokenTwo])

    //useEffect that updates the allowance and the user balance for the token in redux whenever token one changes, or whenever the user logs in:
    useEffect(() => {
        async function updateAllowance() {
            const token = new ethers.Contract(tokenOne.value.address, tokenOne.value.abi, library.getSigner())
            const tokenAllowance = await token.allowance(account, tokenOne.value.exchangeAddress)
            const balance = await token.balanceOf(account)

            dispatch(
                setAllowanceAndBalance({
                        approved: tokenAllowance.toString(),
                        balance: balance.toString()
                    })
            )
        }

    if (tokenOne.value.id !== "1" && active) {
        updateAllowance().catch(console.error)
    }
    else {
        setAllowance("")
    }
    }, [tokenOne, active])

  return (
      <>
      <ConnectModal functions={[connectModal, setConnectModal]}/>
      <SelectCoinModal functions={[coinModal, setCoinModal]}/>
      <SwapSettingsModal functions={[settingsModal, setSettingsModal]}/>
      <Main className="App">
        <Header functions={[connectModal, setConnectModal]}/>
        <Guidelines functions={[activeTokenAttributes]}/>
        <Swap functions={[setConnectModal, setCoinModal, setSettingsModal]}/>
        <GratitudeMessage functions = {[activeTokenAttributes]}/>
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