import React from 'react';
import styled from 'styled-components';
import coinbase_icon from '../../assets/images/coinbase_icon.png';
import metamask_icon from '../../assets/images/metamask_icon.png';
import walletconnect_icon from '../../assets/images/walletconnect_icon.png';
import {AiOutlineClose} from 'react-icons/ai';
import {useWeb3React} from "@web3-react/core";
import { connectors } from "../../constants/connectors"

const ConnectModal = (props) => {
    const [connectModal, setConnectModal]= props.functions;

    const { activate } = useWeb3React();

    return (
        connectModal &&
        <ModalContainer>
            <ModalBox>
                <TitleWrapper>
                    <ModalTitle>Connect to a Wallet</ModalTitle>
                    <AiOutlineCloseBtn onClick={() => {
                        setConnectModal(false)
                    }}/>
                </TitleWrapper>
                <WalletButtonsWrapper>
                    <WalletButton onClick={() => {
                        activate(connectors.coinbaseWallet);
                        setConnectModal(false)
                    }}>
                        <WalletIcon src={coinbase_icon} alt="coinbase_icon"/>
                        <WalletText> Coinbase Wallet</WalletText>
                    </WalletButton>
                    <WalletButton onClick={() => {
                        activate(connectors.walletConnect)
                        setConnectModal(false)
                    }}>
                        <WalletIcon src={walletconnect_icon} alt="walletconnect_icon"/>
                        <WalletText> WalletConnect</WalletText>
                    </WalletButton>
                    <WalletButton onClick={() => {
                        activate(connectors.injected)
                        setConnectModal(false)
                    }}>
                        <WalletIcon src={metamask_icon} alt="metamask_icon"/>
                        <WalletText> MetaMask</WalletText>
                    </WalletButton>

                </WalletButtonsWrapper>
                <ButtonWrapper>
                    <CloseButton onClick={() => {
                        setConnectModal(false)
                    }}>Close</CloseButton>
                </ButtonWrapper>
            </ModalBox>
        </ModalContainer>
    )
}
export default ConnectModal;

export const ModalContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.8);
    position: fixed;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  color: white;
`

export const ModalBox = styled.div`
  background-color: #07070a;
  height: 300px;
  width: 300px;
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgba(252, 252, 252, 0.25);
`

export const TitleWrapper = styled.div`
  display: flex;
`

export const ModalTitle = styled.h3`
  margin-left: 10px;
`

export const AiOutlineCloseBtn = styled(AiOutlineClose)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-radius: 50px;
    box-shadow: 0 0 10px #fff;
  }

`

export const WalletButtonsWrapper = styled.div`
display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const WalletButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 218px;
  //padding-top: 16px;
  padding-right: 16px;
  padding-left: 16px;
  border: rgba(140, 140, 140, 0.6) 1px solid;
  border-radius: 10px;
  margin-bottom: 16px;
  background-color: #1c1c1c;
  //no text selection
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2e2e31;
    border: rgba(255, 255, 255, 0.8) 1px solid;
  }


`
export const WalletIcon = styled.img`
    width: 25px;
    height: 25px;
  `

export const WalletText = styled.p`
  margin-left: 10px;
`


export const ButtonWrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`
export const CloseButton = styled(WalletButton)`
    margin-top: 20px;
    width: 80px;
    height: 30px;
`


