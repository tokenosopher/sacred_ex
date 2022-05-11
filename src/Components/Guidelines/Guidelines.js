import React from 'react';
import styled from 'styled-components';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import { useSelector} from "react-redux";
import { useEffect, useState} from "react";

//all of the writing for this component is found in the tokenListSlice.js file

const Guidelines = () => {

    //this holds all of the information about the active token, after being filtered by the useEffect
    const [activeTokenAttributes, setActiveTokenAttributes] = useState();

    //this gets the token list from the redux store:
    const tokenList = useSelector((state) => state.tokenList)

    //this retrieves the active token from the redux store:
    const activeToken = useSelector((state) => state.token)

    //use effect that updates the active token attributes whenever the active token changes:
    useEffect(() => {
        const newActiveToken = tokenList.value.filter((token) => {
            return token.symbol === activeToken.value
        })
        setActiveTokenAttributes(newActiveToken[0])
        console.log(newActiveToken[0])
    }, [activeToken])


    return (
        <Container>
            <GuidelineTitle>
                <TitleWrapper>
                    <h2>{activeTokenAttributes && activeTokenAttributes.guidelineTitle}</h2>
                    <QuestionMarkWrapper>
                        <AiOutlineQuestionCircle size={20}/>
                    </QuestionMarkWrapper>
                </TitleWrapper>
                <p> {activeTokenAttributes && activeTokenAttributes.guidelines}</p>
            </GuidelineTitle>
        </Container>
    )
}
export default Guidelines;


const Container = styled.div`
  margin-top: 10px;
  color:white;
  display: flex;
  //column:
  flex-direction: column;
  min-height: 286px;
  width: 480px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;

const GuidelineTitle = styled.div`
  margin: 10px;

  h1 {
    align-items: center;
    //center vertically:
    display: flex;
    justify-content: center;
    //creating shading effect under the title:
    text-shadow: 0 0 2px #ffffff;
  }

  //place the text to the left:
  text-align: left;

  p {
    //increase the spacing between letters:
    letter-spacing: 0.5px;
  }

`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const QuestionMarkWrapper = styled.div`

  position: absolute;
  right: 0;
  top: 0;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //background-color: rgba(0, 0, 0, 0.4);
  //border-radius: 50%;
  //padding: 5px;
  //box-shadow: 0px 0px 2px #ffffff;
  //color: #ffffff;
  //font-size: 20px;
  //font-weight: bold;
  //text-shadow: 0px 0px 2px #ffffff;
  //z-index: 1;
  //cursor: pointer;
`;