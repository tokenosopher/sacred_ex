import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {BsExclamationCircle, BsGear} from 'react-icons/bs'
import {IoMdArrowDropdown} from 'react-icons/io'
import {DualRing} from 'react-awesome-spinners'
import {useWeb3React} from "@web3-react/core";
import {useDispatch, useSelector} from "react-redux";
import {setSwapButton} from "../../features/swapModal/swapButton";
import {CoinIcon} from "../Modals/SelectCoinModal";
import {ethers} from "ethers";
import {setAllowance} from "../../features/activeTokenNumbers/activeTokenNumbers";
import Exchange from "../../artifacts/src/contracts/Exchange.sol/Exchange.json";
import {etherFromWei, weiFromEther} from "../../constants/utils";
import {
    setCalculateMessageWarning,
    setDisableCheckbox,
    setDisableNameAndMessageFields,
    setMessage,
    setName
} from "../../features/messages/messagesSlice";

import {
    setCompletedTransactionHash,
    setIncompleteSwapModalState,
    setSwapCompletedModalState,
    setTwitterMsgId
} from "../../features/swapCompletedModal/swapCompletedModalSlice";

const Swap = (props) => {

    const {active, library} = useWeb3React();

    const [setConnectModal, setCoinModal, setSettingsModal] = props.functions

    const dispatch = useDispatch()


    const tokenOne = useSelector((state) => state.tokenOne)
    const tokenTwo = useSelector((state) => state.tokenTwo)
    const approvedAmount = useSelector((state) => state.activeTokenNumbers.approved)
    const balance = useSelector((state) => state.activeTokenNumbers.balance)
    const slippage = useSelector((state) => state.activeTokenNumbers.globalSlippage)
    const name = useSelector((state) => state.messages.name)
    const message = useSelector((state) => state.messages.message)
    const checkedBool = useSelector((state) => state.messages.checkedBool)
    const messageWarning = useSelector((state) => state.messages.messageWarning)
    // const swapCompletedModalState = useSelector((state) => state.swapCompletedModalState.isOpened)

    const [fieldOne, setFieldOne] = useState("")
    const [fieldTwo, setFieldTwo] = useState("")
    const [showApprovedBtn, setShowApprovedBtn] = useState(false)
    const [showAccountWarning, setShowAccountWarning] = useState(false)
    const [accountWarningText, setAccountWarningText] = useState("")
    const [showBalanceWarning, setShowBalanceWarning] = useState(false)
    const [balanceWarningText, setBalanceWarningText] = useState("")
    const [swapEnabled, setSwapEnabled] = useState(true)

    const [disableFieldOne, setDisableFieldOne] = useState(false)
    const [disableFieldTwo, setDisableFieldTwo] = useState(false)
    const [disableButtonOne, setDisableButtonOne] = useState(false)
    const [disableButtonTwo, setDisableButtonTwo] = useState(false)
    const [disableApprovedBtn, setDisableApprovedBtn] = useState(false)
    const [approveSpinner, setApproveSpinner] = useState(false)
    const [swapSpinner, setSwapSpinner] = useState(false)


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

    },[fieldOne, balance, active, approvedAmount])

    //use effect to hide the approve button when the account isn't active
    useEffect(() => {
        if (!active) {
            setShowApprovedBtn(false)
        }
    },[active])

    //check if fieldOne value is higher than balance:
    const checkIfBalanceIsSufficient = () => {

        const fieldOneBN = weiFromEther(fieldOne.toString())
        const balanceBN = ethers.BigNumber.from(balance)

        if (tokenOne.value.id === "1" && fieldOneBN.gt(balanceBN)) {
            setAccountWarningText("Not enough balance for the transaction")
            setShowAccountWarning(true)
        }

        else if (fieldOneBN.gt(balanceBN)) {
            setAccountWarningText("Not enough balance for the transaction")
            setShowAccountWarning(true)
        }
        else {
            setShowAccountWarning(false)
        }
    }

    //enables or disables the swap button based on various conditions:
    useEffect(() => {
        if (active &&
            (showAccountWarning ||
            showBalanceWarning ||
            showApprovedBtn ||
            messageWarning ||
            Number(fieldOne) === 0 ||
            Number(fieldTwo) === 0) ||
            (tokenOne.value.id === tokenTwo.value.id) ||
            ((tokenOne.value.id !== "1") && (tokenTwo.value.id !== "1"))
        ) {
            setSwapEnabled(false)
        }
        else {
            setSwapEnabled(true)
        }
    }, [showAccountWarning,
        showBalanceWarning,
        showApprovedBtn,
        messageWarning,
        tokenOne,
        tokenTwo,
        fieldOne,
        fieldTwo,
        active])


    const checkIfApprovalNeeded = () => {
        const fieldOneWei = weiFromEther(fieldOne.toString())
        const approvedBN = ethers.BigNumber.from(approvedAmount)
        const balanceBN = ethers.BigNumber.from(balance)

        // if balance exists and the amount entered is less than what has been approved
        if (balance &&
            fieldOneWei.gt(approvedBN)
            && fieldOneWei.lte(balanceBN) &&
            Number(fieldOne) !== 0 &&
            (tokenOne.value.id !== "1")

        ) {
            setShowApprovedBtn(true)
        }
            //if balance exists and the amount entered is lower than what has already been approved
            //or the amount entered is higher than the balance of the user
            //or there is no amount entered:
        else if (balance && (fieldOneWei.lte(approvedBN) || fieldOneWei.gt(balanceBN) || !fieldOneWei || Number(fieldOne) === 0)) {
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
                    setFieldTwo(ethAmountRounded.toString())
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
                setFieldTwo(tokenAmountRounded.toString())
            }
        }
        if (active && activeField === "fieldOne") {
            getAmount()
        }

    }, [fieldOne, active])

    //sets the output in field one based on the value in field two:
    useEffect(() => {
        async function getAmount() {
            //if field two is matic
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
                    //formula for the token amount is token exchange balance multiplied by fieldTwoWei, over the eth exchange balance minus fieldTwoWei
                    //we also extract the 1% fee using the hundredBN and ninetyNineBN
                    const hundredBN = ethers.BigNumber.from(100)
                    const ninetyNineBN = ethers.BigNumber.from(99)
                    let tokenAmount =
                        hundredBN.mul(tokenExchangeBalance).mul(fieldTwoWei)
                        .div(ninetyNineBN.mul(ethExchangeBalance.sub(fieldTwoWei)))
                    const tokenAmountScaled = etherFromWei(tokenAmount)
                    const tokenAmountRounded = Math.round(tokenAmountScaled * 100000000) / 100000000

                    setFieldOne(tokenAmountRounded.toString())
                }

        }

            //if FieldTwo is not matic:
            else if (tokenOne.value.symbol === 'MATIC' &&
                tokenTwo.value.symbol !== 'MATIC' &&
                fieldTwo
            ) {
                const contract = new ethers.Contract(tokenTwo.value.exchangeAddress, Exchange.abi, library.getSigner())
                const fieldTwoWei = weiFromEther(fieldTwo)

                //get eth balance of exchange
                const ethExchangeBalance = await library.getBalance(tokenTwo.value.exchangeAddress)
                const tokenExchangeBalance = await contract.getReserve()


                //verify that the tokenExchangeBalance is smaller thant the fieldTwoWei:
                if (tokenExchangeBalance.lte(fieldTwoWei)) {
                    setFieldOne("0")
                    setBalanceWarningText("The exchange balance is insufficient")
                    setShowBalanceWarning(true)
                }
                else {
                    setShowBalanceWarning(false)
                    //formula for the eth amount is eth exchange balance multiplied by fieldTwoWei, over the token exchange balance minus fieldTwoWei
                    //we also extract the 1% fee using the hundredBN and ninetyNineBN
                    const hundredBN = ethers.BigNumber.from(100)
                    const ninetyNineBN = ethers.BigNumber.from(99)
                    let ethAmount =
                        hundredBN.mul(ethExchangeBalance).mul(fieldTwoWei)
                            .div(ninetyNineBN.mul(tokenExchangeBalance.sub(fieldTwoWei)))
                    const ethAmountScaled = etherFromWei(ethAmount)
                    const ethAmountRounded = Math.round(ethAmountScaled * 100000000) / 100000000
                    setFieldOne(ethAmountRounded.toString())
                }
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

    //function to enable or disable fields. Defaults to false, so only the ones that we want disabled we need set to true:
    //h in the variablename stands for handle:
    const disableEnableFields =
        (
            hFieldOne = false,
            hFieldTwo = false,
            hButtonOne = false,
            hButtonTwo = false
        ) => {
            setDisableFieldOne(hFieldOne)
            setDisableFieldTwo(hFieldTwo)
            setDisableButtonOne(hButtonOne)
            setDisableButtonTwo(hButtonTwo)
        }

    //enabling or disabling ALL FIELDS for swapping:
    const disableFieldsForSwap = (disable = false) => {
        //local fields:
        setDisableFieldOne(disable)
        setDisableFieldTwo(disable)
        setDisableButtonOne(disable)
        setDisableButtonTwo(disable)
        setSwapEnabled(!disable)

        //loading modal:
        setSwapSpinner(disable)
        dispatch(
            setDisableCheckbox(disable)
        )

        if (checkedBool) {
            dispatch(
                setDisableNameAndMessageFields(disable)
            )
        }
    }


    const handleApprove = async () => {

        const token = new ethers.Contract(tokenOne.value.address, tokenOne.value.abi, library.getSigner())
        const allowanceEth = ethers.utils.parseUnits(fieldOne, "ether")

        //disable all four fields:
        disableEnableFields(true, true, true, true)
        //enable the approve spinner:
        setApproveSpinner(true)
        //enable the approve button:
        setDisableApprovedBtn(true)
        try {
            let txResult = await token.approve(tokenOne.value.exchangeAddress, allowanceEth)
            await txResult.wait()
            console.log(txResult)
        } catch (e) {
            console.log(e)
        }

        //enable all four fields:
        disableEnableFields()
        setApproveSpinner(false)
        setDisableApprovedBtn(false)

        dispatch(
            setAllowance(allowanceEth.toString())
        )
        setShowApprovedBtn(false)
    }

    const swapOrConnectBtn = async () => {
        if (active) {
            await performSwap()
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

    //takes the current values of field two and the slippage to calculate the minimum amount of return that the user
    //agrees with
    const calculateMinAmount = () => {
        const fieldTwoWei = weiFromEther(fieldTwo.toString())
        const slippageBN = weiFromEther(slippage.toString())

        // calculate the minimum amount of return that the user agrees with
        const slippageAmount = fieldTwoWei.mul(slippageBN).div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(20)))
        return fieldTwoWei.sub(slippageAmount)
    }

    // a function that sends an HTTP requestwith the variables name and message
    const sendMessage = async (coin) => {
        const url = "https://dev--sacredextwitter.sacredcoinprotocol.autocode.gg/"
        const data = {
            name: name,
            message: message,
            password: process.env.REACT_APP_AUTOCODE_PASS,
            coin: coin
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await response.json()
    }

    const checkMessageLength = () => {
        if ((name === '') || (message === '')) {
            dispatch(
                setCalculateMessageWarning(true)
            )
            return false
        }
        else {
            return true
        }
    }

    const clearValues = () => {
        dispatch(setCalculateMessageWarning(false))
        setFieldOne("")
        setFieldTwo("")
        dispatch(setName(""))
        dispatch(setMessage(""))
    }


    const performSwap = async () => {
        if ((tokenOne.value.symbol !== 'MATIC') &&
            (tokenTwo.value.symbol === 'MATIC')) {

            const contract = new ethers.Contract(tokenOne.value.exchangeAddress, Exchange.abi, library.getSigner())
            const minAmountMatic = calculateMinAmount()
            const tokensSoldBN = weiFromEther(fieldOne.toString())

            try {
                if (!checkedBool) {
                    disableFieldsForSwap(true)
                    const txResult = await contract.tokenToEthSwap(tokensSoldBN, minAmountMatic)
                    await txResult.wait()
                    handleCompletedTransactionHash(txResult.hash)
                    handleSwapCompletedModal(true)
                    clearValues()
                }
                //checking if the message is not empty
                else if (checkMessageLength()) {
                    disableFieldsForSwap(true)
                    const txResult = await contract.tokenToEthSwapSacredOne(tokensSoldBN, minAmountMatic, name, message)
                    await txResult.wait()
                    handleCompletedTransactionHash(txResult.hash)
                    const messageRes = await sendMessage(tokenOne.value.symbol)
                    handleTwitterMsg(messageRes.msg_twitter_id)
                    handleSwapCompletedModal(true)
                    clearValues()
                }
            } catch (error) {
                //if the success box didn't come up, bring up the incomplete transaction modal:
                handleSwapIncompleteModal()
            }
            disableFieldsForSwap(false)
            console.log("done publishing on the chain")

        }

        if ((tokenOne.value.symbol === 'MATIC') &&
            (tokenTwo.value.symbol !== 'MATIC')) {

            const contract = new ethers.Contract(tokenTwo.value.exchangeAddress, Exchange.abi, library.getSigner())
            const minAmountToken = calculateMinAmount()
            const maticSoldBN = weiFromEther(fieldOne.toString())


            try {
                if (!checkedBool) {
                    disableFieldsForSwap(true)
                    const txResult = await contract.ethToTokenSwap(minAmountToken, {value: maticSoldBN})
                    await txResult.wait()
                    handleCompletedTransactionHash(txResult.hash)
                    handleSwapCompletedModal(true)
                    clearValues()
                }

                //checking if the message is not empty
                else if (checkMessageLength()){
                    disableFieldsForSwap(true)
                    const txResult = await contract.ethToTokenSwapSacredOne(minAmountToken, name, message, {value: maticSoldBN})
                    await txResult.wait()
                    handleCompletedTransactionHash(txResult.hash)
                    await handleSwapCompletedModal(true)
                    const messageRes = await sendMessage(tokenTwo.value.symbol)
                    handleTwitterMsg(messageRes.msg_twitter_id)
                    clearValues()
                }
            }
            catch (error) {
                //if the success box didn't come up, bring up the incomplete transaction modal:
                handleSwapIncompleteModal()
            }
            disableFieldsForSwap(false)

            console.log("done publishing on the chain")
        }

    }

    const handleTwitterMsg = (id) => {
        dispatch(
            setTwitterMsgId(id)
        )
    }

    const handleCompletedTransactionHash = (hash) => {
        dispatch(
            setCompletedTransactionHash(hash)
        )
    }

    const handleSwapCompletedModal = () => {
        dispatch(
            setSwapCompletedModalState(true)
        )
    }

    const handleSwapIncompleteModal = () => {
        dispatch(
            setIncompleteSwapModalState(true)
        )
    }


    return (
        <Container>
            <MiniHeader>
                <HeaderText>Swap</HeaderText>
                <GearIcon onClick={() => {
                    setSettingsModal(true)
                }}/>
            </MiniHeader>
            <SwapColumnOne>
                <InputWrapper>
                    <InputFieldOne disabled={disableFieldOne} onChange={(e) => handleFieldOneChange(e)} value={fieldOne}
                                   type="number" placeholder="0.0"/>
                    {showApprovedBtn && <ApproveBtn disabled={disableApprovedBtn} onClick={() => handleApprove()}>Approve</ApproveBtn>}
                    <ApproveSpinnerWrapper $show={approveSpinner}>
                        <DualRing size={20} color={"rgba(70,128,208,0.65)"}/>
                    </ApproveSpinnerWrapper>
                    <SwapOneButtonWrapper disabled={disableButtonOne} onClick={() => coinSelectorBtn(1)}>
                        <SwapCoinIcon src={tokenOne.value.icon}/>
                        <p>{tokenOne && tokenOne.value.symbol}</p>
                        <DropDown/>
                    </SwapOneButtonWrapper>
                </InputWrapper>
            </SwapColumnOne>
            <SwapColumnTwo>
                <InputWrapper>
                    <InputFieldTwo disabled={disableFieldTwo} onChange={(e) => handleFieldTwoChange(e)} value={fieldTwo}
                                   type="number" placeholder="0.0"/>
                    <SwapTwoButtonWrapper disabled={disableButtonTwo} onClick={() => coinSelectorBtn(2)}>
                        <SwapCoinIcon src={tokenTwo.value.icon}/>
                        <p>{tokenTwo && tokenTwo.value.symbol}</p>
                        <DropDown/>
                    </SwapTwoButtonWrapper>
                </InputWrapper>
            </SwapColumnTwo>


            <ButtonOption disabled={!swapEnabled}
                          onClick={() => swapOrConnectBtn()}>
                {swapSpinner &&
                <SwapSpinnerWrapper>
                    <DualRing size={20} color={"rgba(70,128,208,0.41)"}/>
                </SwapSpinnerWrapper>}
                {active ? 'Swap' : 'Connect Wallet'}</ButtonOption>
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
            {messageWarning &&
                <NotificationWrapper>
                    <Exclamation/>
                    <p>{"Please fill or uncheck the message below."}</p>
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
  @media (max-width: 495px) {
    min-width: 350px;
    width: 95%;
    margin-top: 0;
    margin-bottom: 10px;
  }
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

  &:enabled {
    &:hover {
      border: 1px solid #737373;
    }  
  }
  
  &:disabled {
    background-color: rgb(33, 36, 42);
    color: #737373;
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

  &:enabled {
    &:hover {
      border: 1px white solid;
    }
  }

  &:disabled {
    background-color: rgba(15, 17, 19, 0.65);
    color: rgba(255, 255, 255, 0.72);
    border: 1px rgba(128, 128, 128, 0.55) solid;
  }

`

const ApproveBtn = styled(SwapOneButtonWrapper)`

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

  &:enabled {
    &:hover {
      color: white;
    }  
  }
  

  &:disabled {
    color: rgba(255, 0, 0, 0.53);
    border: 1px rgba(255, 0, 0, 0.55) solid;
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

const SwapSpinnerWrapper = styled.div`
    position: absolute;
    top:8px;
    left:35%;
  @media (max-width: 495px) {
    left: 30%;
  }
`


const ButtonOption = styled.button`
  position: relative;
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
  user-select: none;
  transition: all 0.2s ease-in-out;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;

  &:enabled {
    cursor: pointer;

    &:hover {
      border: 1px solid #4680d0;
    }

    &:active {
      color: white;
      background-color: #335273;
    }
  }

  &:disabled {
    background-color: rgba(23, 42, 66, 0.3);
    color: rgba(70, 128, 208, 0.3);
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

const ApproveSpinnerWrapper=styled.div`
  position: absolute;
  right: 200px;
  top: 22px;
  //show only when show is true:
  display: ${props => props.$show ? 'flex' : 'none'};
`