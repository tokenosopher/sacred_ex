import React from 'react';
import {ModalContainer, ModalBox, TitleWrapper, ModalTitle, AiOutlineCloseBtn} from "./ConnectModal";
import styled from "styled-components";
import {useSelector} from "react-redux";

import {setTokenOne} from "../../features/tokens/tokenOneSlice";
import {setTokenTwo} from "../../features/tokens/tokenTwoSlice";
import {useDispatch} from "react-redux";

const SelectCoinModal = (props) => {

    const swapButton = useSelector((state) => state.swapButton)

    const coinList = useSelector((state) => state.tokenList)

    const dispatch = useDispatch();

    const [coinModal, setCoinModal] = props.functions

    const handleClickOne = (coin) => {

        const newActiveToken = coinList.value.filter((token) => {
            return token.symbol === coin.symbol
        })

        if (swapButton.value === 1) {
            dispatch(setTokenOne(newActiveToken[0]));
        } else {
            dispatch(setTokenTwo(newActiveToken[0]));
        }

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
                    {coinList && coinList.value.map((coin) => (
                        <CoinWrapper onClick={() => {handleClickOne(coin)}} key={coin.id}>
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
  width: 100%;
  height: 1px;
  background-color: rgba(252, 252, 252, 0.25);
  border: rgba(252, 252, 252, 0.25);
  margin-bottom: 0;
  margin-top:0;
`

export const CoinsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  border-radius: 10px;
  
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(124, 87, 87, 0.25);
  }
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