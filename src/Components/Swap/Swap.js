import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {BsGear} from 'react-icons/bs'
import {BsExclamationCircle} from 'react-icons/bs'
import {IoMdArrowDropdown} from 'react-icons/io'
import {useWeb3React} from "@web3-react/core";
import {useDispatch, useSelector} from "react-redux";
import {setSwapButton} from "../../features/swapModal/swapButton";
import {CoinIcon} from "../Modals/SelectCoinModal";
import {ethers} from "ethers";
import {setAllowance} from "../../features/activeTokenNumbers/activeTokenNumbers";
import Exchange from "../../artifacts/src/contracts/Exchange.sol/Exchange.json";
import {weiFromEther, etherFromWei} from "../../constants/utils";

const Swap = (props) => {

    const {active, account, library} = useWeb3React();

    const [setConnectModal, setCoinModal, setSettingsModal] = props.functions

    const dispatch = useDispatch()


    const tokenOne = useSelector((state) => state.tokenOne)
    const tokenTwo = useSelector((state) => state.tokenTwo)
    const approvedAmount = useSelector((state) => state.activeTokenNumbers.approved)
    const balance = useSelector((state) => state.activeTokenNumbers.balance)

    const [fieldOne, setFieldOne] = useState("")
    const [fieldTwo, setFieldTwo] = useState("")
    const [showApprovedBtn, setShowApprovedBtn] = useState(false)
    const [showAccountWarning, setShowAccountWarning] = useState(false)
    const [accountWarningText, setAccountWarningText] = useState("")
    const [showBalanceWarning, setShowBalanceWarning] = useState(false)
    const [balanceWarningText, setBalanceWarningText] = useState("")


    //sets the active field of the swap section, so that the useEffect triggered by changes in the other field
    // does not get triggered, causing an error
    const [activeField, setActiveField] = useState("")

    useEffect(() => {

        // check to see if amount needs to be approved if field one is filled,
        // there is an active account, approved amount is available and the active field is field one:
        if (fieldOne && active && approvedAmount) {
            checkIfApprovalNeeded()
            checkIfBalanceIsSufficient()
        }

    },[fieldOne, active, approvedAmount])

    //check if fieldOne value is higher than balance:
    const checkIfBalanceIsSufficient = () => {
        const fieldOneBN = weiFromEther(fieldOne.toString())
        const balanceBN = ethers.BigNumber.from(balance)

        if (fieldOneBN.gt(balanceBN)) {
            setAccountWarningText("Not enough balance for the transaction")
            setShowAccountWarning(true)
        }
        else {
            setShowAccountWarning(false)
        }
    }


    const checkIfApprovalNeeded = () => {
        const fieldOneWei = weiFromEther(fieldOne.toString())
        const approvedBN = ethers.BigNumber.from(approvedAmount)
        const balanceBN = ethers.BigNumber.from(balance)

        console.log(fieldOneWei.toString())
        console.log(approvedBN.toString())

        // if balance exists and the amount entered is less than what has been approved
        if (balance && fieldOneWei.gt(approvedBN) && fieldOneWei.lte(balanceBN) && Number(fieldOne) !== 0) {
            console.log("approved amount is less than field one")
            console.log(fieldOneWei.toString())
            setShowApprovedBtn(true)
        }
            //if balance exists and the amount entered is lower than what has already been approved
            //or the amount entered is higher than the balance of the user
            //or there is no amount entered:
        else if (balance && (fieldOneWei.lte(approvedBN) || fieldOneWei.gt(balanceBN) || !fieldOneWei || Number(fieldOne) === 0)) {
            console.log("approved amount is greater than field one")
            setShowApprovedBtn(false)
        }
    }

    ///sets the output in field two based on the value in field one:
    useEffect(() => {
        async function getAmount() {
            if (tokenOne.value.symbol !== 'MATIC' &&
                tokenTwo.value.symbol === 'MATIC' &&
                fieldOne && Number(fieldOne) !== 0)
            {
                // const tokenContract = new ethers.Contract(tokenOne.value.address, tokenOne.value.abi, library.getSigner())
                // const balance = await tokenContract.balanceOf(account)
                const fieldOneWei = weiFromEther(fieldOne)

                //checking if field one is larger than the balance:
                if (balance && fieldOneWei.gt(balance)) {

                }

                else {
                    setShowBalanceWarning(false)
                    const contract = new ethers.Contract(tokenOne.value.exchangeAddress, Exchange.abi, library.getSigner())

                    const ethAmount = await contract.getEthAmount(fieldOneWei)
                    const ethAmountScaled = etherFromWei(ethAmount)
                    //round ethAmountScaled to 8 decimal places
                    const ethAmountRounded = Math.round(ethAmountScaled * 100000000) / 100000000
                    setFieldTwo(ethAmountRounded)
                    console.log(ethAmountRounded.toString())
                }

        }
            else if (tokenOne.value.symbol === 'MATIC' &&
                tokenTwo.value.symbol !== 'MATIC' &&
                fieldOne && Number(fieldOne) !== 0)
            {
                const contract = new ethers.Contract(tokenTwo.value.exchangeAddress, Exchange.abi, library.getSigner())
                const fieldOneWei = weiFromEther(fieldOne)
                const tokenAmount = await contract.getTokenAmount(fieldOneWei)
                const tokenAmountScaled = etherFromWei(tokenAmount)
                //round tokenAmountScaled to 8 decimal places
                const tokenAmountRounded = Math.round(tokenAmountScaled * 100000000) / 100000000
                setFieldTwo(tokenAmountRounded)
                console.log(tokenAmountRounded.toString())
            }
        }
        if (active && activeField === "fieldOne") {
            getAmount()
        }

    }, [fieldOne, active])

    //sets the output in field one based on the value in field two:
    useEffect(() => {
        async function getAmount() {
            if (tokenOne.value.symbol !== 'MATIC' &&
                tokenTwo.value.symbol === 'MATIC' &&
                fieldTwo
            ) {
                const contract = new ethers.Contract(tokenOne.value.exchangeAddress, Exchange.abi, library.getSigner())
                const fieldTwoWei = weiFromEther(fieldTwo)

                //get eth balance of exchange
                const ethExchangeBalance = await library.getBalance(tokenOne.value.exchangeAddress)
                const tokenExchangeBalance = await contract.getReserve()

                //verify that the ethExchangeBalance is smaller than the fieldTwoWei
                if (ethExchangeBalance.lte(fieldTwoWei)) {
                    setFieldOne("0")
                    setBalanceWarningText("The exchange balance is insufficient")
                    setShowBalanceWarning(true)

                }
                else {
                    setShowBalanceWarning(false)
                    let tokenAmount = tokenExchangeBalance.mul(fieldTwoWei).div(ethExchangeBalance.sub(fieldTwoWei))
                    const tokenAmountScaled = etherFromWei(tokenAmount)
                    const tokenAmountRounded = Math.round(tokenAmountScaled * 100000000) / 100000000

                    setFieldOne(tokenAmountRounded.toString())
                }

                //formula for the token amount is token exchange balance multiplied by fieldTwoWei, over the eth exchange balance minus fieldTwoWei

        }
            else if (tokenOne.value.symbol === 'MATIC' &&
                tokenTwo.value.symbol !== 'MATIC' &&
                fieldTwo
            ) {

                const contract = new ethers.Contract(tokenTwo.value.exchangeAddress, Exchange.abi, library.getSigner())
                const fieldTwoWei = weiFromEther(fieldTwo)

                //get eth balance of exchange
                const ethExchangeBalance = await library.getBalance(tokenTwo.value.exchangeAddress)
                const tokenExchangeBalance = await contract.getReserve()

                //formula for the token amount is eth exchange balance multiplied by fieldTwoWei, over the token exchange balance minus fieldTwoWei
                let ethAmount = ethExchangeBalance.mul(fieldTwoWei).div(tokenExchangeBalance.sub(fieldTwoWei))
                const ethAmountScaled = etherFromWei(ethAmount)
                const ethAmountRounded = Math.round(ethAmountScaled * 100000000) / 100000000

                setFieldOne(ethAmountRounded.toString())
            }
        }
        if (active && activeField === "fieldTwo") {
            getAmount()
        }

    }, [fieldTwo, active])

    const handleFieldOneChange = (event) => {
        setActiveField("fieldOne")
        if (Number(event.target.value) >= 0) {
            setFieldOne(event.target.value)
        }

    }

    const handleFieldTwoChange = (event) => {
        setActiveField("fieldTwo")
        if (Number(event.target.value) >= 0){
            setFieldTwo(event.target.value)
        }
    }

    const handleApprove = async () => {
        const token = new ethers.Contract(tokenOne.value.address, tokenOne.value.abi, library.getSigner())
        const allowanceEth = ethers.utils.parseUnits(fieldOne, "ether")
        await token.approve(tokenOne.value.exchangeAddress, allowanceEth)
        dispatch(
            setAllowance(allowanceEth.toString())
        )
        setShowApprovedBtn(false)
    }

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
                    <GearIcon onClick={() => {setSettingsModal(true)}}/>
            </MiniHeader>
            <SwapColumnOne>
                <InputWrapper>
                    <InputFieldOne onChange={(e) => handleFieldOneChange(e)} value={fieldOne} type="number" placeholder="0.0"/>
                    {showApprovedBtn && <ApproveBtn onClick={() => handleApprove()}>Approve</ApproveBtn>}

                    <SwapOneButtonWrapper onClick = {() => coinSelectorBtn(1) }>
                        <SwapCoinIcon src={tokenOne.value.icon} />
                    <p>{tokenOne && tokenOne.value.symbol}</p>
                        <DropDown/>
                    </SwapOneButtonWrapper>
                </InputWrapper>
            </SwapColumnOne>
            <SwapColumnTwo>
                <InputWrapper>
                    <InputFieldTwo onChange={(e) => handleFieldTwoChange(e)} value={fieldTwo} type="number" placeholder="0.0"/>
                    <SwapTwoButtonWrapper onClick = {() => coinSelectorBtn(2)} >
                        <SwapCoinIcon src={tokenTwo.value.icon} />
                        <p>{tokenTwo && tokenTwo.value.symbol}</p>
                        <DropDown/>
                    </SwapTwoButtonWrapper>
                </InputWrapper>
            </SwapColumnTwo>

            <ButtonOption onClick={() => swapOrConnectBtn()}> {active ? 'Swap' : 'Connect Wallet'}</ButtonOption>
            {
                showAccountWarning &&
                <NotificationWrapper>
                <Exclamation/><
                    p>{accountWarningText}</p>
                </NotificationWrapper>
            }
            {
                showBalanceWarning &&
                <NotificationWrapper>
                    <Exclamation/><
                    p>{balanceWarningText}</p>
                </NotificationWrapper>
            }

        </Container>
    )
}
export default Swap;


const Container = styled.div`
  color:white;
  display: flex;
  //column:
  flex-direction: column;
  min-height: 286px;
  width: 480px;
  //justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`

const MiniHeader = styled.div`
  display:flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
const HeaderText = styled.div`
  //up right down left
  margin: 10px 10px 0 10px;
`

const GearIcon = styled(BsGear)`
  margin: 10px 10px 0 10px;
  
  //make a transition:
  transition: all 0.2s ease-in-out;
  
  &:hover {
    border-radius: 50px;
    box-shadow: 0 0 10px #fff;
  }

`


const SwapColumnOne = styled.div`
margin-bottom: 10px;
`

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

const SwapColumnTwo = styled.div`
margin-bottom: 10px;
`

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

const NotificationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  margin-bottom: 10px;
  //set text size to be smaller:
  font-size: 0.9em;
`

const Exclamation = styled(BsExclamationCircle)`
  margin-right: 5px;


`