import React from 'react';
import styled from 'styled-components';

const Footer = () => {

    return (
        <Container>
            <Links>
            {/*//create a link to the github repo:*/}
            <a href="https://github.com/tokenosopher/sacred_ex">Code</a>
            </Links>
            <InfoMiddle>
                <p>SacredEx Beta 0.1.0 - Polygon Testnet Only</p>
            </InfoMiddle>
            <InfoRight>
                <p>Built by Tokenosopher during EthGlobal.</p>
            </InfoRight>
        </Container>
    )
}
export default Footer;

const Container = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000000;
  padding-top: 30px;

  a {
    color: #457fb5;
    text-decoration: none;
    margin-left: 1rem;
    font-size: 1rem;
    //make font bold
    font-weight: bold;

    &:hover {
      color: #2a4e6e;
    }
`

const Links = styled.div`
  margin-left: calc(2vw);

`

const InfoMiddle = styled.div`
    margin-left: 10vw;
  @media (max-width: 750px) {
    margin-right: 2vw;
  }
  //make space between letters larger:
  letter-spacing: 0.05rem;

`

const InfoRight = styled.div`
  margin-right: calc(2vw);
  //make invisible for small screens
  @media (max-width: 750px) {
    display: none;
  }
  
`