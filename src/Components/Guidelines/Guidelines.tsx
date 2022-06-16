import React from 'react';
import styled from 'styled-components';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import gratitude_coin from "../../assets/token_icons/gratitude_coin.png";
import contractAddresses from "../../artifacts/src/contract_addresses/contractAddresses.json";
import IERC20Sacred from "../../artifacts/src/contracts/IERC20Sacred.sol/IERC20Sacred.json";

//all of the writing for this component is found in the tokenListSlice.js file

interface GuidelinesProps {
    activeTokenAttributes: {
        id: string;
        name: string;
        symbol: string;
        icon: string,
        guidelineTitle: string;
        guidelines: string;
        messageTitle: string;
        messageDescription: string;
        messagePlaceholderOne: string;
        messageConnector: string;
        messagePlaceholderTwo: string;
        address: string;
        abi: any,
        exchangeAddress: string;
    }
}




const Guidelines = ({ activeTokenAttributes }: GuidelinesProps) => {

    console.log(activeTokenAttributes)



    return (
        <Container>
            <GuidelineTitle>
                <TitleWrapper>
                    <h2>{activeTokenAttributes && activeTokenAttributes.guidelineTitle}</h2>
                    <QuestionMarkWrapper>
                        <QuestionCircle size={20}/>
                        <QuestionHoverBox>
                            <p>Guidelines are a unique feature of sacred coins. They are recommendations for the users of the coin that are hardcoded into the coin contract, and that address actions beyond what the code can do, and into what people can do to bring the coin value.</p>
                            <p>To learn more, visit the About section.</p>
                        </QuestionHoverBox>
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
  
  //media query for mobile:
  @media (max-width: 495px) {
    min-width: 350px;
    width: 95%;
  }
`;

const GuidelineTitle = styled.div`
  margin: 10px;

  h2 {
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
    margin-left: 5px;
  }

`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const QuestionHoverBox = styled.div`
  position: absolute;
  right: -250px;
  top: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgb(22, 21, 27);
  border-radius: 10px;
  width: 200px;
  height: 200px;
  padding: 10px;
  font-size: 0.8rem;
  @media (max-width: 1000px) {
    //keep it to the rightmost part of the screen based on change in viewport size:
    right: 0;
  }
  opacity: 0;
  transition: all 500ms;
  p {
    margin-top: 3px;
    margin-bottom: 5px;
  }
`


export const QuestionMarkWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    ${QuestionHoverBox} {
      opacity: 1;
    }
  }
`;

export const QuestionCircle = styled(AiOutlineQuestionCircle)`
  transition: all 200ms;

  &:hover {
    color: #dadada;
  }
`;

