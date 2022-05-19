import React, {useState} from 'react';
import styled from 'styled-components';
import sacred_logo from '../../assets/images/sacred_logo.png'
import {useWeb3React} from "@web3-react/core";
import {truncateAddress} from "../../constants/utils";
import { useLocation, Link } from 'react-router-dom';
import {useEffect} from "react";

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
                    <ButtonSwap $activeButton={activeButton} to="/">Swap</ButtonSwap>
                    <ButtonAbout $activeButton={activeButton} to="/about">About </ButtonAbout>
            </MidMenu>
            <RightMenu>
                <PolygonWrapper>
                <PolygonButton> Polygon Testnet </PolygonButton>
                    <PolygonPopup>Only testnet during beta testing</PolygonPopup>
                </PolygonWrapper>
                <ConnectWrapper>
                <ConnectWalletButton onClick={() => onClickConnectWalletButton() }> {active ? setAddressValue() : 'Connect Wallet'}  </ConnectWalletButton>
                </ConnectWrapper>
                {/*<ThreeDotsButton>...</ThreeDotsButton>*/}
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
    display: flex;
    align-items: center;
    * {
      margin-right: 10px;
    }
    
`
const PolygonPopup = styled.div`
  position: absolute;
  top: 50px;
  right: -10px;
  background-color: rgba(31, 39, 55, 0.69);
  color: rgba(219, 228, 236, 0.58);
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 250ms;
  width: 140px;
  font-size: 0.8rem;
  opacity: 0;
  cursor: pointer;
  font-weight: bold;
`

const PolygonButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  //border-radius: 10px;
  //width: 70px;
  height: 30px;
  user-select: none;
  width: 130px;
  background-color: rgba(23, 42, 66, 0.47);
  color: rgba(70, 128, 208, 0.55);
  border-radius: 15px;
  font-weight: bold;
`



const ConnectWalletButton = styled.button`
  
  height:30px;
  cursor: pointer;
  user-select: none;
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
const ThreeDotsButton = styled.button`
  width: 30px;
  margin-right: 20px;
  `

const ButtonSwap = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  //padding: 5px 10px;
  border-radius: 30px;
  border: ${props => (props.$activeButton === "swap") ?  "1px solid #4680d0" : "1px solid transparent"};
  background-color: ${props => (props.$activeButton === "swap") ?  "rgba(0,0,0,0.5)" : ""};;
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
  border: ${props => (props.$activeButton === "about") ?  "1px solid #4680d0" : "1px solid transparent"};
  transition: all 0.2s ease-in-out;
  background-color: ${props => (props.$activeButton === "about") ?  "rgba(0,0,0,0.5)" : ""};;
  &:hover {
    border: 1px solid #4680d0;
    background-color: rgba(0,0,0,0.5);
  }

  &:active {
    color: white;
    background-color: #335273;
  }
`

const PolygonWrapper = styled.div`
    position: relative;

  &:hover {
    ${PolygonPopup} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`



const ConnectWrapper = styled.div``