import React from 'react';
import styled from 'styled-components';
import {BiCheckbox} from 'react-icons/bi';
import {BiCheckboxChecked} from 'react-icons/bi';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setName, setChecked, setMessage, setMessageWarning} from "../../features/messages/messagesSlice";
import {QuestionCircle, QuestionHoverBox} from "../Guidelines/Guidelines";

const Guidelines = (props) => {

    const [activeTokenAttributes]= props.functions

    const dispatch = useDispatch();

    const globalName = useSelector(state => state.messages.name);
    const globalMessage = useSelector(state => state.messages.message);
    const globalChecked = useSelector(state => state.messages.checkedBool);
    const calculateMessageWarning = useSelector(state => state.messages.calculateMessageWarning);
    const disableNameField = useSelector(state => state.messages.disableNameField);
    const disableMessageField = useSelector(state => state.messages.disableMessageField);
    const disableCheckbox = useSelector(state => state.messages.disableCheckbox);

    const handleMessageWarning = (bool) => {
        dispatch(setMessageWarning(bool));
    }

    const handleNameChange = (event) => {
        dispatch(
            setName(event.target.value)
        )
    };

    const handleMessageChange = (event) => {
        dispatch(
            setMessage(event.target.value)
        )
    };

    const handleCheckedChange = (value) => {
        if (!disableCheckbox) {
            dispatch(
                setChecked(value)
            )
        }
    };

    useEffect(() => {
        //if calculateMessage Warning is true, and either global message or global name is empty, then set messageWarning to true
        if (calculateMessageWarning &&
            globalChecked &&
            (globalMessage === '' || globalName === '')) {
            handleMessageWarning(true);
        } else {
            handleMessageWarning(false);
        }
    }, [globalName, globalMessage, calculateMessageWarning]);

    //if the user unchecks the need to include the message, then re-enable the swap button.
    useEffect(() => {
        if (!globalChecked) {
            handleMessageWarning(false)
        }
    },[globalChecked])


    return (
        <Container checked={globalChecked}>
            <TitleWrapper>
                <CheckboxWrapper $disabled={disableCheckbox}>
                    {
                        globalChecked ?
                            <BiCheckboxChecked size={30} onClick={() => handleCheckedChange(false)}/>
                            :
                            <BiCheckbox size={30} onClick={() => handleCheckedChange(true)}/>
                    }
                </CheckboxWrapper>
                <h3>{activeTokenAttributes && activeTokenAttributes.messageTitle}</h3>
                <QuestionMarkWrapper>
                    <QuestionCircleMsgs size={20}/>
                    <QuestionHoverBoxMsgs>
                        <p>Coin Messages are a unique feature of sacred coins. These messages get stored on the blockchain in the coin events, and are also saved on social media (i.e. Twitter for now)</p>
                        <p>Hint: Enter your twitter handle in place of the name, and when you buy the coin, you will be tagged in the Tweet.</p>

                    </QuestionHoverBoxMsgs>
                </QuestionMarkWrapper>
            </TitleWrapper>
            <StatementWrapper>
                <p>{activeTokenAttributes && activeTokenAttributes.messageDescription}</p>
            </StatementWrapper>
            <InputsWrapper checked={globalChecked}>
                <InputFirstRow>
                    <InputName
                        disabled={disableNameField}
                        type="text"
                        placeholder={activeTokenAttributes && activeTokenAttributes.messagePlaceholderOne}
                        value={globalName}
                        onChange={handleNameChange}
                    />
                    <p>{activeTokenAttributes && activeTokenAttributes.messageConnector}</p>
                </InputFirstRow>
                <InputMessage
                    disabled={disableMessageField}
                    type={"textarea"}
                    rows={"5"}
                    placeholder={activeTokenAttributes && activeTokenAttributes.messagePlaceholderTwo}
                    value={globalMessage}
                    onChange={handleMessageChange}
                />
            </InputsWrapper>
        </Container>
    )
}
export default Guidelines;


const Container = styled.div`
  color:white;
  display: flex;
  //column:
  flex-direction: column;
  min-height: 350px;
  width: 480px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  //height: ${props => props.globalChecked ? "350px" : "100px"};
  //overflow-y:hidden;
  transition: height 0.2s ease-in-out;

  @media (max-width: 495px) {
    min-width: 350px;
    width: 95%;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
`;

const TitleWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  margin: 10px;
  display: flex;
  position: relative;
  cursor: pointer;
  color: ${props => props.$disabled ? "rgba(255, 255, 255, 0.5)" : "white"};
`

const QuestionHoverBoxMsgs = styled(QuestionHoverBox)`
`

const QuestionMarkWrapper = styled.div`
  display: flex;
  right: 10px;
  top: 10px;
  position: absolute;
  &:hover {
    ${QuestionHoverBoxMsgs} {
      opacity: 1;
    }  
  }
`
const StatementWrapper = styled.div`
  margin:10px;
  display:flex;
  text-align: left;
`

const InputsWrapper = styled.div`
  text-align: left;
  margin-left:10px;
  visibility: ${props => props.checked ? "visible" : "hidden"};
  opacity: ${props => props.checked ? "1" : "0"};
  transition: all 0.2s ease-out;
  
`
const InputFirstRow = styled.div`
  display: flex; 
  align-items: center;
  
  p {
    margin-left: 10px;
  }
`


const InputName = styled.input`
  background: #21242b;
  color: white;
  border: 1px solid transparent;
  box-shadow: black;
  border-radius: 5px;
  height: 30px;
  //text size bigger:
  font-size: 15px;
  padding-left: 10px;
  
  
  transition: border 0.2s ease-in-out;

  //create a white border on hover:
  &:enabled {
    &:hover {
      border: 1px solid #737373;
    }
  }

  &:disabled {
    background: rgba(33, 36, 43, 0.51);
  }
`

const InputMessage = styled.textarea`
  background: #21242b;
  color: white;
  border: 1px solid transparent;
  box-shadow: black;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 440px;
  font-size: 15px;
  padding-left: 10px;
  padding-top: 10px;
  max-height: 100px;

  @media (max-width: 495px) {
    min-width: 310px;
    width: 95%;
    margin-top: 0;
    margin-bottom: 10px;
  }

  transition: border 0.2s ease-in-out;

  //create a white border on hover:
  &:enabled {
    &:hover {
      border: 1px solid #737373;
    }
  }

  &:disabled {
    background: rgba(33, 36, 43, 0.51);
  }

`



const QuestionCircleMsgs = styled(QuestionCircle)`

`