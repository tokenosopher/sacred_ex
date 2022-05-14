import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {BsGear} from 'react-icons/bs'
import {IoMdArrowDropdown} from 'react-icons/io'
import {useWeb3React} from "@web3-react/core";
import { useDispatch } from "react-redux";
import {setSwapButton} from "../../features/swapModal/swapButton";
import {useSelector} from "react-redux";
import {CoinIcon} from "../Modals/SelectCoinModal";
import {weiFromEther} from "../../constants/utils";
import {ethers} from "ethers";

const Swap = (props) => {

    const {active} = useWeb3React();

    const [setConnectModal, setCoinModal] = props.functions

    const dispatch = useDispatch()


    const tokenOne = useSelector((state) => state.tokenOne)
    const tokenTwo = useSelector((state) => state.tokenTwo)
    // const approvedAmount = useSelector((state) => state.activeTokenNumbers.approved)

    const [fieldOne, setFieldOne] = useState()
    const [fieldTwo, setFieldTwo] = useState()
    // const [showApprovedBtn, setShowApprovedBtn] = useState(false)





    // useEffect(() => {
    //     // convert fieldOne to big number:
    //     const fieldOneBN = ethers.utils.parseEther(fieldOne)
    //
    //     //see if fieldOneBN is smaller than approved amount:
    //     if (active && fieldOneBN.lt(approvedAmount)) {
    //         setShowApprovedBtn(true)
    //     }
    // },[fieldOne])

    const swapOrConnectBtn = () => {
        if (active) {
            if (tokenOne.value.id === "1") {
                console.log("Token one is matic")
            }
            else if (tokenOne.value.id === "2") {
                console.log("Token one is GRTFUL")
            }

            else if (tokenOne.value.id === "3") {
                console.log("Token one is GEPETO")
            }
        }
        else {
            setConnectModal(true)
        }
    }

    const coinSelectorBtn = (fieldOneOrTwo) => {
        setCoinModal(true)
        dispatch(
            setSwapButton(
                fieldOneOrTwo
            )
        )
    }

    return (
        <Container>
            <MiniHeader>
                <HeaderText>Swap</HeaderText>
                <GearWrapper>
                    <BsGear/>
                </GearWrapper>
            </MiniHeader>
            <SwapColumnOne>
                <InputWrapper>
                    <InputFieldOne onChange={(e) => setFieldOne(e.target.value)} value={fieldOne} type="number" placeholder="0.0"/>
                    {/*{showApprovedBtn && <ApproveBtn showApprovedBtn={showApprovedBtn}>Approve</ApproveBtn>}*/}

                    <SwapOneButtonWrapper onClick = {() => coinSelectorBtn(1) }>
                        <SwapCoinIcon src={tokenOne.value.icon} />
                    <p>{tokenOne && tokenOne.value.symbol}</p>
                        <DropDown/>
                    </SwapOneButtonWrapper>
                </InputWrapper>
            </SwapColumnOne>
            <SwapColumnTwo>
                <InputWrapper>
                    <InputFieldTwo onChange={(e) => setFieldTwo(e.target.value)} value={fieldTwo} type="number" placeholder="0.0"/>
                    <SwapTwoButtonWrapper onClick = {() => coinSelectorBtn(2)} >
                        <SwapCoinIcon src={tokenTwo.value.icon} />
                        <p>{tokenTwo && tokenTwo.value.symbol}</p>
                        <DropDown/>
                    </SwapTwoButtonWrapper>
                </InputWrapper>
            </SwapColumnTwo>
            <ButtonOption onClick={() => swapOrConnectBtn()}> {active ? 'Swap' : 'Connect Wallet'}</ButtonOption>

        </Container>
    )
}
export default Swap;


const Container = styled.div`
  color:white;
  display: flex;
  //column:
  flex-direction: column;
  height: 286px;
  width: 480px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  //flex space between:
  //flex-wrap: space-between;
`

const MiniHeader = styled.div`
  display:flex;
  justify-content: space-between;
`
const HeaderText = styled.div`
  //up right down left
  margin: 10px 10px 0 10px;
`

const GearWrapper = styled(HeaderText)`
`


const SwapColumnOne = styled.div``

const InputWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  margin: 0 10px;
  position: relative;
`

const InputFieldOne = styled.input`
  width: 100vw;
  height: 80px;
  border-radius: 10px;
  font-size: 30px;
  background-color: rgb(33, 36, 42);
  color: white;
  padding-left: 10px;
  border: 1px solid transparent;
  //remove arrows from input:
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  transition: border 0.2s ease-in-out;

  //create a white border on hover:
  &:hover {
    border: 1px solid #737373;
  }
`




const SwapOneButtonWrapper = styled.button`
  position: absolute;
  right: 10px;
  top: 20px;
  border-radius: 20px;
  width: 130px;
  height: 45px;
  background-color: #0f1113;
  color: #ffffff;
  border: 1px grey solid;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
  display: flex;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    border: 1px white solid;
  }
`

const ApproveBtn = styled(SwapOneButtonWrapper)`
  //hide:
  
  position: absolute;
  right: 150px;
  top: 27px;
  width: 70px;
  height: 30px;
  //border-radius: 10px;
  color: red;
  border: 1px red solid;
  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    color: white;
  }
`

const SwapCoinIcon = styled(CoinIcon)`
  margin-left: 5px;
`

const DropDown = styled(IoMdArrowDropdown)`
    position: relative;
    //align to the right of the button:
    
`

const InputFieldTwo = styled(InputFieldOne)``

const SwapColumnTwo = styled.div``

const SwapTwoButtonWrapper = styled(SwapOneButtonWrapper)``

const ButtonOption = styled.div`
  width: 96%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #172a42;
  color: #4680d0;
  //up right down left
  margin: 0 10px 10px 10px;
  border-radius: 15px;
  border: 1px solid transparent;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #4680d0;
  }

  &:active {
    color: white;
    background-color: #335273;
  }
`