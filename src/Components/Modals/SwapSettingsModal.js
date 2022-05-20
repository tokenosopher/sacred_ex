import React from 'react';
import styled from 'styled-components';
import {ModalContainer, ModalBox, TitleWrapper, ModalTitle, AiOutlineCloseBtn, ButtonWrapper, CloseButton} from "./ConnectModal";
import {Line} from "./SelectCoinModal";
import {useDispatch, useSelector} from "react-redux";
import {setGlobalSlippage} from "../../features/activeTokenNumbers/activeTokenNumbers";
import {useState} from "react";

const SwapSettingsModal = (props) => {
    const [settingsModal, setSettingsModal] = props.functions

    const globalSlippage = useSelector((state) => state.activeTokenNumbers.globalSlippage)

    const [localSlippage, setLocalSlippage] = useState(globalSlippage)

    const dispatch = useDispatch()

    //function that handles the apply button and changes the slippage in the redux store
    const handleApply = () => {
        if (localSlippage <=100) {
            dispatch(
                setGlobalSlippage(localSlippage)
            )
            setSettingsModal(false)
        }
        else {
            console.log("nope!")
        }

    }

    const handleCancel = () => {
        setLocalSlippage(globalSlippage)
        setSettingsModal(false)
    }

    const handleSlippageField = (e) => {
        let { value, min, max } = e.target;
        if (!value || (Number(value) >= Number(min) && Number(value) <= Number(max))) {
            (setLocalSlippage(value))
        }
    }

    return (
        settingsModal &&
        <ModalContainer>
            <ModalBoxSwapSettings>
                <TitleWrapper>
                    <ModalTitle>Swap Settings</ModalTitle>
                    <AiOutlineCloseBtn onClick={() => {handleCancel()}}/>
                </TitleWrapper>
                <Line />
                <SlippageRowWrapper>
                    <p>Slippage:</p>
                    <SlippageInputWrapper>
                    <SlippageInput
                        type="number"
                        min= {0}
                        max= {100}
                        value={localSlippage}
                        onChange={(e) => {handleSlippageField(e)}}/>
                        <p>%</p>
                    </SlippageInputWrapper>

                </SlippageRowWrapper>
                <ButtonWrapper>
                    <ApplyButton onClick={() => {handleApply()}}>Apply</ApplyButton>
                    <CloseButton onClick={() => {handleCancel()}}>Cancel</CloseButton>
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