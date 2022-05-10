import React from 'react';
import styled from 'styled-components';
import sacred_logo from '../../assets/images/sacred_logo.png'
import {useWeb3React} from "@web3-react/core";
import ConnectModal from "../ConnectModal/ConnectModal";
import {truncateAddress} from "../../constants/utils";

const Header = (props) => {

    const [connectModal, setConnectModal] = props.functions;

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
    }

    const setAddressValue = () => {
        return truncateAddress(account)
    }

    return (
    <>
        <Nav>
            <Logo src={sacred_logo} />
            <MidMenu>
                <li>
                    <a href={"#"} > Swap</a>
                    <a href={"#"} > Pool</a>
                </li>
            </MidMenu>
            <RightMenu>
                <PolygonButton> Polygon</PolygonButton>
                <ConnectWalletButton onClick={() => setConnectModal(true) }> {active ? setAddressValue() : 'Connect Wallet'}  </ConnectWalletButton>
                <ThreeDotsButton>...</ThreeDotsButton>

                {/*<li>*/}
                {/*    <a> Polygon </a>*/}
                {/*    <a> Connect Wallet</a>*/}
                {/*    <a>...</a>*/}
                {/*</li>*/}

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
  
  li {
    list-style-type: none;
  }
  
  //create space between the a tags:
  a {
    margin-right: 20px;
    //remove underline:
    text-decoration: none;
    color: white;
    //remove the dot from the a tag
  }`

const RightMenu = styled(MidMenu)`
    
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