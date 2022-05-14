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
import {useSelector} from "react-redux";
import {ethers} from 'ethers';
import {useWeb3React} from "@web3-react/core";

import {useDispatch} from "react-redux";
import {setAllowance} from "./features/activeTokenNumbers/activeTokenNumbers";

function App() {

    const dispatch = useDispatch();

    const { active, account, library} = useWeb3React();

    const [activeTokenAttributes, setActiveTokenAttributes] = useState();

    const [connectModal, setConnectModal] = useState(false);

    const [coinModal, setCoinModal] = useState(false);

    //this gets the token list from the redux store:
    const tokenList = useSelector((state) => state.tokenList)

    //this retrieves the active token from the redux store:
    const tokenOne = useSelector((state) => state.tokenOne)

    const tokenTwo = useSelector((state) => state.tokenTwo)

    //use effect that updates the active token attributes whenever the active token changes:
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

    //useEffect that updates the allowance for the token whenever token one changes:
    useEffect( () => {
        async function updateAllowance() {
                const token = new ethers.Contract(tokenOne.value.address, tokenOne.value.abi, library.getSigner())
                const allowance = await token.allowance(account, tokenOne.value.exchangeAddress)
                dispatch(
                    setAllowance(allowance)
                )
            }

    if (tokenOne.value.id !== "1" && active) {
        updateAllowance().catch(console.error)
    }
    else {
        setAllowance("")
    }
    }, [tokenOne])

  return (
      <>
      <ConnectModal functions={[connectModal, setConnectModal]}/>
      <SelectCoinModal functions={[coinModal, setCoinModal]}/>
      <Main className="App">
        <Header functions={[connectModal, setConnectModal]}/>
        <Guidelines functions={[activeTokenAttributes]}/>
        <Swap functions={[setConnectModal, setCoinModal]}/>
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