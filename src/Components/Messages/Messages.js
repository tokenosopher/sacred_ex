import React from 'react';
import styled from 'styled-components';
import {BiCheckbox} from 'react-icons/bi';
import {BiCheckboxChecked} from 'react-icons/bi';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setName, setChecked, setMessage} from "../../features/messages/messagesSlice";

const Guidelines = (props) => {

    // const [checked, setChecked] = useState(true);

    const [activeTokenAttributes]= props.functions

    const dispatch = useDispatch();

    const globalName = useSelector(state => state.messages.name);
    const globalMessage = useSelector(state => state.messages.message);
    const globalChecked = useSelector(state => state.messages.checkedBool);

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
        dispatch(
            setChecked(value)
        )
    };

    return (
        <Container checked={globalChecked}>
            <TitleWrapper>
                <CheckboxWrapper>
                    {
                        globalChecked ?
                            <BiCheckboxChecked size={30} onClick={() => handleCheckedChange(false)}/>
                            :
                            <BiCheckbox size={30} onClick={() => handleCheckedChange(true)}/>
                    }
                </CheckboxWrapper>
                <h3>{activeTokenAttributes && activeTokenAttributes.messageTitle}</h3>
                <QuestionMarkWrapper>
                    <AiOutlineQuestionCircle size={20}/>
                </QuestionMarkWrapper>
            </TitleWrapper>
            <StatementWrapper>
                <p>{activeTokenAttributes && activeTokenAttributes.messageDescription}</p>
            </StatementWrapper>
            <InputsWrapper checked={globalChecked}>
                <InputFirstRow>
                    <InputName
                        type="text"
                        placeholder={activeTokenAttributes && activeTokenAttributes.messagePlaceholderOne}
                        value={globalName}
                        onChange={handleNameChange}
                    />
                    <p>{activeTokenAttributes && activeTokenAttributes.messageConnector}</p>
                </InputFirstRow>
                <InputGratitudeObject
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
  overflow-y:hidden;
  transition: height 0.2s ease-in-out;
  
`;

const TitleWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  margin: 10px;
  display:flex;
  position: relative;
`;

const QuestionMarkWrapper = styled.div`
  display: flex;
  right: 10px;
  top: 10px;
  position: absolute;
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
  &:hover {
    border: 1px solid #737373;
  }
`

const InputGratitudeObject = styled.textarea`
  background: #21242b;
  color: white;
  border: 1px solid transparent;
  box-shadow: black;
  border-radius: 5px;
  margin-bottom:10px;
  width:440px;
  font-size: 15px;
  padding-left: 10px;
  padding-top:10px;
  max-width: 440px;
  max-height: 100px;

  transition: border 0.2s ease-in-out;

  //create a white border on hover:
  &:hover {
    border: 1px solid #737373;
  }
`