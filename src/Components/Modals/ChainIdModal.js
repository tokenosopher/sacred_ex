import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useWeb3React} from "@web3-react/core";
import {
    ModalContainer,
    ModalBox,
    TitleWrapper,
    ModalTitle,
    ButtonWrapper,
    CloseButton,
    AiOutlineCloseBtn
} from "./ConnectModal";




const ChainIdModal = () => {

    const { active, chainId, library } = useWeb3React();

    const [openChainIdModal, setOpenChainIdModal] = useState(false);


    //trying to switch network to polygon testnet:
    const switchNetwork = async () => {

        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ "chainId": "0x13881" }],
            });
        } catch (switchError) {
            // 4902 error code indicates the chain is missing on the wallet
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                "chainId": "0x13881",
                                rpcUrls:["https://matic-mumbai.chainstacklabs.com"],
                                chainName: "Polygon Testnet",
                                nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
                                blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                            }
                        ],
                    });
                } catch (error) {
                    console.error(error)
                }
            }
        }
    };

    //checking that the chain is correct:
    useEffect(() => {
        if (chainId) {
            console.log(chainId)
        }
        if (chainId && chainId.toString() !== "80001") {
            setOpenChainIdModal(true)
        }
        else {
            setOpenChainIdModal(false)
        }
    },[chainId, active])





    return (
        openChainIdModal &&
        <ModalContainer>
            <ModalBoxChainId>
                <TitleWrapperChainId>
                    <ModalTitleChainId>
                        Please connect to Polygon Testnet
                    </ModalTitleChainId>
                    {/*<AiOutlineCloseBtn onClick={() => {*/}
                    {/*    setOpenChainIdModal(false)*/}
                    {/*}}/>*/}
                </TitleWrapperChainId>
                <TextWrapper>
                    <p>The dex functionality will be disabled until you do.</p>
                    <p>You can click on the button below to set your network to Polygon Testnet. If that doesn't work, please <a href={"https://stackoverflow.com/questions/70373443/how-to-use-testnet-during-development-in-coinbase-wallet/71518418#71518418"} target="_blank" rel="noreferrer noopener">switch manually</a> in your wallet.</p>
                </TextWrapper>
                <ButtonWrapper>
                    <SwitchNetworkBtn onClick={() => switchNetwork()}>Switch to Polygon Testnet</SwitchNetworkBtn>
                </ButtonWrapper>
            </ModalBoxChainId>
        </ModalContainer>
    )
}
export default ChainIdModal;

const ModalBoxChainId = styled(ModalBox)`
    
`

const TitleWrapperChainId = styled(TitleWrapper)`
    display: flex;
    margin-left: 10px;
`

const ModalTitleChainId = styled(ModalTitle)`
  font-size: 15px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
`

const TextWrapper = styled.div`
  margin: 5px 5px 5px 10px;
  p {
    font-size: 14px;
  }

  a {
    color: white;
  }
  
`

const SwitchNetworkBtn = styled.button`
  margin-top: 15px;
  height: 45px;
  cursor: pointer;
  user-select: none;
  width: 200px;

  background-color: #172a42;
  color: #4680d0;

  border-radius: 15px;
  border: 1px solid transparent;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #4680d0;
    background-color: #000000;
  }

  &:active {
    color: white;
    background-color: #335273;
  }
`

