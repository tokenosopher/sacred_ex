import React, {useState} from 'react';
import styled from 'styled-components';
import sacred_logo from '../../assets/images/sacred_logo.png'
import {useWeb3React} from "@web3-react/core";
import {truncateAddress} from "../../constants/utils";
import { useLocation, Link } from 'react-router-dom';
import {useEffect} from "react";

const Header = (props) => {

    const [setConnectModal] = props.functions;
    const [activeButton, setActiveButton] = useState("");
    const [showSmallScrnConnectWalletBtn, setShowSmallScrnConnectWalletBtn] = useState(false)
    const [showSmallScrnDisconnectBtn, setShowSmallScrnDisconnectBtn] = useState(false)

    const { active, account, deactivate } = useWeb3React();


    let location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveButton("swap");
        }
        else if (location.pathname === "/about") {
            setActiveButton("about");
        }
    }, [location])


    //takes in the smallScreen argument, which is true when the smallScrnConnectWalletBtn is pressed:
    const onClickConnectWalletButton = (smallScreen = false) => {
        if (active) {
            return
        }
        else if (!smallScreen){
            setConnectModal(true)
        }
        else if (smallScreen) {
            setShowSmallScrnConnectWalletBtn(false)
            setConnectModal(true)
        }
    }

    const handleThreeDotsBtn = () => {
        handleShowSmallScreenMenu()
    }

    const handleShowSmallScreenMenu = () => {
        setShowSmallScrnConnectWalletBtn(!showSmallScrnConnectWalletBtn)
        if (!active) {
            return;
        }
        setShowSmallScrnDisconnectBtn(!showSmallScrnDisconnectBtn)
    }

    const handleSmallScreenDisconnectBtn = () => {
        //order is important here, as it won't hide the smallScrnDisconnectBtn if the account is not stil active:
        handleShowSmallScreenMenu()
        deactivate()
    }

    const setAddressValue = () => {
        return truncateAddress(account)
    }

    return (
        <>
            <Nav>
                <Logo src={sacred_logo}/>
                <MidMenu>
                    <ButtonSwap $activeButton={activeButton} to="/">Swap</ButtonSwap>
                    <ButtonAbout $activeButton={activeButton} to="/about">About </ButtonAbout>
                </MidMenu>
                <RightMenu>
                    <PolygonWrapper>
                        <PolygonButton> Polygon Testnet </PolygonButton>
                        <PolygonPopup>Only testnet during beta testing</PolygonPopup>
                    </PolygonWrapper>
                    <ConnectWrapper $activeAccount={active}>
                        <ConnectWalletButton
                            $activeAccount={active}
                            onClick={() => onClickConnectWalletButton()}>
                            {active ? setAddressValue() : 'Connect Wallet'}
                        </ConnectWalletButton>
                        <DisconnectPopup onClick={() => deactivate()}
                        >Disconnect</DisconnectPopup>
                    </ConnectWrapper>
                    <SmallScreenMenuWrapper>
                    <ThreeDotsButton onClick={() => {handleThreeDotsBtn()}}>...</ThreeDotsButton>
                        <SmallScreenConnectWalletBtn
                            $activeAccount={active}
                            $show={showSmallScrnConnectWalletBtn}
                            onClick={() => onClickConnectWalletButton(true)}>
                            {active ? setAddressValue() : 'Connect Wallet'}
                        </SmallScreenConnectWalletBtn>
                        <SmallScreenDisconnectBtn
                            $show={showSmallScrnDisconnectBtn}
                            onClick={() => {handleSmallScreenDisconnectBtn()}}>
                            Disconnect
                        </SmallScreenDisconnectBtn>
                    </SmallScreenMenuWrapper>
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
  }
  
  @media (max-width: 768px) {
    margin-left: 10px;
  }

`

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

export const PolygonButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  //border-radius: 10px;
  //width: 70px;
  height: 30px;
  user-select: none;
  width: 130px;
  background-color: rgba(7, 13, 19, 0.47);
  color: rgba(70, 128, 208, 0.55);
  border-radius: 15px;
  font-weight: bold;
  @media (max-width: 768px) {
    display: none;
  }
`

const DisconnectPopup = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 30px;
  background-color: rgb(31, 39, 55);
  color: rgb(70, 128, 208);
  border-radius: 15px;
  transition: all 250ms;
  width: 130px;
  height: 30px;
  font-size: 0.8rem;
  opacity: 0;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    border: 1px solid #4680d0;
    background-color: rgba(0,0,0,0.5);
  }

`

const ConnectWrapper = styled.div`
  position: relative;
  &:hover {
    ${DisconnectPopup} {
      opacity: ${props => props.$activeAccount ? 1 : 0};
    }
  }
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
    border: ${props => props.$activeAccount ? '1px solid transparent' : '1px solid #4680d0'};
    background-color: ${props => props.$activeAccount ? '#172a42' : 'rgba(0,0,0,0.5)'};
  }

  &:active {
    color: white;
    background-color: #335273;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`
const ThreeDotsButton = styled.button`
  display: none;
  width: 40px;
  height: 30px;
  font-weight: bold;
  margin-right: 20px;
  background-color: #172a42;
  color: white;
  //make a white border:
  border: 1px solid transparent;
  //border: 1px solid;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    border: 1px solid white;
    background-color: rgba(0,0,0,0.5);
  }
  margin-left: -10px;
  @media (max-width: 768px) {
    display: initial;
  }
`

const SmallScreenMenuWrapper = styled.div`
    position: relative;
`

const SmallScreenConnectWalletBtn = styled.div`
  display: ${props => props.$show ? "flex" : "none"};
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: absolute;
  right: 0;
  top: 40px;
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
  font-size: 14px;
  
  &:hover {
    border: ${props => props.$activeAccount ? '1px solid transparent' : '1px solid #4680d0'};
    background-color: ${props => props.$activeAccount ? '#172a42' : 'rgba(0,0,0,0.5)'};
  }

  &:active {
    color: white;
    background-color: #335273;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

const SmallScreenDisconnectBtn = styled(SmallScreenConnectWalletBtn)`
  top:75px;
  display: ${props => props.$show ?  'flex': 'none'};
  
  &:hover {
    border: 1px solid #4680d0;
    background-color: rgba(0,0,0,0.5);
  }
  @media (min-width: 768px) {
    display: none;
  }
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


