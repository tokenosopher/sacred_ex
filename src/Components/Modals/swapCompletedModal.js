import React from 'react';
import styled from 'styled-components'
import {useSelector, useDispatch} from "react-redux";
import {setSwapCompletedModalState} from "../../features/swapCompletedModal/swapCompletedModalSlice";
import {FaTwitter} from "react-icons/fa";


const SwapCompletedModal = () => {

    const dispatch = useDispatch();

    const checkedBool = useSelector(state => state.messages.checkedBool);
    const twitterMsgId = useSelector(state => state.swapCompletedModalState.twitterMsgId);
    const completedTransactionHash = useSelector(state => state.swapCompletedModalState.completedTransactionHash);

    const handleClose = () => {
        dispatch(
            setSwapCompletedModalState(false)
        );
    };



    return (
        <Container>
            <ModalBox>
                <ModalTitle>Swap Completed!</ModalTitle>
                <Line/>
                <ModalText>
                    Congratulations, your swap is done processing.
                    You can inspect the blockchain transaction <a href={"https://mumbai.polygonscan.com/tx/" + completedTransactionHash + "#eventlog"} target="_blank" rel="noreferrer noopener">here</a>.
                </ModalText>
                {!checkedBool && <ModalText> Check out the awesome messages that others have written when trading the coin by visiting <a href={"https://twitter.com/CoinMessages"} target="_blank" rel="noreferrer noopener">this page</a> . <FaTwitter size={10}/></ModalText>}
                {checkedBool && <ModalText>The message you wrote will be there as well.</ModalText>}
                {checkedBool && <ModalText>You can also find your message on Twitter <a href={"https://twitter.com/CoinMessages"} target="_blank" rel="noreferrer noopener">here</a>. <FaTwitter size={10}/></ModalText>}
                <CloseButtonWrapper>
                <CloseButton onClick={() => handleClose()}>Close</CloseButton>
                </CloseButtonWrapper>
            </ModalBox>
        </Container>
    )
}
export default SwapCompletedModal;

const Container =styled.div`
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

const ModalBox = styled.div`
  background-color: #07070a;
  height: 300px;
  width: 300px;
  position: fixed;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid rgba(252, 252, 252, 0.25);
`

const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`

const ModalText = styled.div`
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;

 a {
   color: white;
 }
`

const Line = styled.hr`
  width: 100%;
  height: 1px;
  background-color: rgba(252, 252, 252, 0.25);
  border: rgba(252, 252, 252, 0.25);
  margin-bottom: 10px;
  margin-top:0;
`

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CloseButton = styled.div`
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100px;
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

