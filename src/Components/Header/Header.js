import React, {useState} from 'react';
import styled from 'styled-components';
import sacred_logo from '../../assets/images/sacred_logo.png'
import {useWeb3React} from "@web3-react/core";
import ConnectModal from "../Modals/ConnectModal";
import {truncateAddress} from "../../constants/utils";
import { useLocation } from 'react-router-dom';
import {useEffect} from "react";

import { Link } from 'react-router-dom';

const Header = (props) => {

    const [connectModal, setConnectModal] = props.functions;
    const [activeButton, setActiveButton] = useState("");

    const { active, account, library } = useWeb3React();


    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveButton("swap");
        }
        else if (location.pathname === "/about") {
            setActiveButton("about");
        }
    }, [location])




    const onClickConnectWalletButton = () => {
        if (active) {
            return
        }
        else {
            setConnectModal(true)
        }
    }


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

    const setAddressValue = () => {
        return truncateAddress(account)
    }

    return (
    <>
        <Nav>
            <Logo src={sacred_logo} />
            <MidMenu>
                    <ButtonSwap activeButton={activeButton} to="/">Swap</ButtonSwap>
                    <ButtonAbout activeButton={activeButton} to="/about">About </ButtonAbout>
            </MidMenu>
            <RightMenu>
                <PolygonButton> Polygon</PolygonButton>
                <ConnectWalletButton onClick={() => onClickConnectWalletButton() }> {active ? setAddressValue() : 'Connect Wallet'}  </ConnectWalletButton>
                <ThreeDotsButton>...</ThreeDotsButton>
            </RightMenu>
        </Nav>
    </>
    )
}
export default Header;


const Nav = styled.nav`
  width: 100vw;
  height: 70px;
  color: white;
  display: flex;
  align-items: center;
  //create equal distance between elements
  justify-content: space-between;
`

const Logo = styled.img`
  margin-left:30px;
  height: 30px;
`

const MidMenu = styled.div`
  display: flex;
  margin-left: 10vw;
  background-color: #172a42;
  color: #457fcf;
  //padding: 5px 10px;
  border-radius: 20px;
  height: 30px;
  align-items: center;

  //create space between the a tags:
  a {
    padding: 0 40px;
    //remove underline:
    text-decoration: none;
    color: #457fcf;
    font-weight: bold;
    height: 30px;
  }`

const RightMenu = styled.div`
    
`

const PolygonButton = styled.button`
  background-color: rgba(0,0,0,0.5);
  border-radius: 10px;
  width: 70px;
  height:30px;
  color: white;
  cursor: pointer;
  user-select: none;
  //transition:
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(252, 252, 252, 0.25);
    border : 1px solid white;
  }
`
const ConnectWalletButton = styled(PolygonButton)`
  width: 130px;

  background-color: #172a42;
  color: #4680d0;

  border-radius: 15px;
  border: 1px solid transparent;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #4680d0;
    background-color: rgba(0,0,0,0.5);
  }

  &:active {
    color: white;
    background-color: #335273;
  }


`
const ThreeDotsButton = styled(PolygonButton)`
  width: 30px;
  margin-right: 20px;
  `

const ButtonSwap = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  //padding: 5px 10px;
  border-radius: 30px;
  border: ${props => (props.activeButton === "swap") ?  "1px solid #4680d0" : "1px solid transparent"};
  background-color: ${props => (props.activeButton === "swap") ?  "rgba(0,0,0,0.5)" : ""};;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 1px solid #4680d0;
    background-color: rgba(0,0,0,0.5);
  }

  &:active {
    color: white;
    background-color: #335273;
  }
`

const ButtonAbout = styled(Link)`

  display: flex;
  align-items: center;
  text-decoration: none;
  //padding: 5px 10px;
  border-radius: 30px;
  border: ${props => (props.activeButton === "about") ?  "1px solid #4680d0" : "1px solid transparent"};
  transition: all 0.2s ease-in-out;
  background-color: ${props => (props.activeButton === "about") ?  "rgba(0,0,0,0.5)" : ""};;
  &:hover {
    border: 1px solid #4680d0;
    background-color: rgba(0,0,0,0.5);
  }

  &:active {
    color: white;
    background-color: #335273;
  }
    
    
`