import React from 'react';
import styled from 'styled-components';
import {ModalContainer, ModalBox, TitleWrapper, ModalTitle, AiOutlineCloseBtn, ButtonWrapper, CloseButton} from "./ConnectModal";
import {Line} from "./SelectCoinModal";

const SwapSettingsModal = (props) => {
    const [settingsModal, setSettingsModal] = props.functions

    return (
        settingsModal &&
        <ModalContainer>
            <ModalBoxSwapSettings>
                <TitleWrapper>
                    <ModalTitle>Swap Settings</ModalTitle>
                    <AiOutlineCloseBtn onClick={() => {setSettingsModal(false)}}/>
                </TitleWrapper>
                <Line />
                <SlippageRowWrapper>
                    <p>Slippage:</p>
                    <SlippageInputWrapper>
                    <SlippageInput type="number" min="0" max="100" step="1" value={props.slippage} onChange={props.handleSlippageChange}/>
                        <p>%</p>
                    </SlippageInputWrapper>

                </SlippageRowWrapper>
                <ButtonWrapper>
                    <ApplyButton onClick={() => {}}>Apply</ApplyButton>
                    <CloseButton onClick={() => {setSettingsModal(false)}}>Cancel</CloseButton>
                </ButtonWrapper>
            </ModalBoxSwapSettings>
        </ModalContainer>
    )
}
export default SwapSettingsModal;

export const ModalBoxSwapSettings = styled(ModalBox)`
    height: 180px;
`

export const SlippageRowWrapper = styled.div`
    //set equal space between child elements
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      margin-left:10px;
    }

`

export const ApplyButton = styled(CloseButton)`
  margin-right: 10px;
  &:hover {
    border: 1px green solid;
  }
  
`

export const SlippageInputWrapper=styled.div`
  display:flex;
  align-items: center;
  margin-right: 10px;
`

export const SlippageInput = styled.input`
    width: 50px;
    height: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    background-color: rgb(33, 36, 42);
    color: white;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`