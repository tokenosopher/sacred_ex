import React from 'react';
import {ModalContainer, ModalBox, TitleWrapper, ModalTitle, AiOutlineCloseBtn} from "./ConnectModal";
import styled from "styled-components";
import polygon_token from "../../assets/token_icons/polygon_token.png"
import gratitude_coin from "../../assets/token_icons/gratitude_coin.png"

import {setToken} from "../../features/tokens/tokenSlice";
import {useDispatch} from "react-redux";

const SelectCoinModal = (props) => {

    const dispatch = useDispatch();

    const coinList = [
        {
            id: "1",
            name: "Polygon Matic",
            symbol: "MATIC",
            icon: polygon_token
        },

        {
            id: "2",
            name: "Gratitude Coin",
            symbol: "GRTFUL",
            icon: gratitude_coin
        }
    ]

    const [coinModal, setCoinModal] = props.functions

    const handleClick = (coin) => {
        dispatch(setToken(coin.symbol));
        setCoinModal(false);
    }

    return (
        coinModal &&
        <ModalContainer>
            <ModalBoxCoins>
                <TitleWrapper>
                    <ModalTitle>Select a Coin</ModalTitle>
                    <AiOutlineCloseBtn onClick={() => {setCoinModal(false)}}/>
                </TitleWrapper>
                <Line />
                <CoinsWrapper>
                    {coinList && coinList.map((coin) => (
                        <CoinWrapper onClick={() => {handleClick(coin)}} key={coin.id}>
                        <CoinIcon src={coin.icon}/>
                        <CoinTextWrapper>
                            <CoinSymbol>{coin.symbol}</CoinSymbol>
                            <CoinName>{coin.name}</CoinName>
                        </CoinTextWrapper>
                        </CoinWrapper>
                        ))}
                </CoinsWrapper>
            </ModalBoxCoins>

        </ModalContainer>
    )
}
export default SelectCoinModal;

export const ModalBoxCoins = styled(ModalBox)`
  width: 480px;
`

export const Line = styled.hr`
  width: 480px;
  height: 1px;
  background-color: rgba(252, 252, 252, 0.25);
  border: rgba(252, 252, 252, 0.25);
`

export const CoinsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`

export const CoinTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  
  p {
    margin-top: 0;
    margin-bottom: 0;
    //font-size: ;
  }
`
export const CoinSymbol = styled.p``


export const CoinName = styled.p`
    font-size: 16px;
    color: rgb(123, 123, 123);
`



export const CoinIcon = styled.img`
    width: 30px;
    height: 30px;
`