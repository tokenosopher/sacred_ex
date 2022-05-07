import React from 'react';
import styled from 'styled-components';
import {AiOutlineQuestionCircle} from 'react-icons/ai';

const Guidelines = () => {

    return (
        <Container>
            <GuidelineTitle>
                <TitleWrapper>
                    <h1>Sacred Coin Guideline</h1>
                    <QuestionMarkWrapper>
                        <AiOutlineQuestionCircle size={20}/>
                    </QuestionMarkWrapper>
                </TitleWrapper>
                {/*<h3>Guideline 1</h3>*/}
                <p> Every time you buy, sell or otherwise use the coin, take a second to think of something that you are grateful for. It could be your family, your friends, the neighborhood you are living in or your pet tortoise. Ideally, you should think about something different that you're grateful for every time you use the coin.</p>
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