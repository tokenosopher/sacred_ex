import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import ethglobal from '../../assets/images/ethglobal.png';

const Footer = () => {

    //TODO - only the left side of the footer will be used so simply the footer styling to reflect this.
    return (
        <Container>
            <Links>
            {/*//create a link to the github repo:*/}
            <a href="https://github.com/tokenosopher/sacred_ex" target="_blank" rel="noreferrer noopener"><FaGithub/></a>
            <a href="https://twitter.com/CoinMessages" target="_blank" rel="noreferrer noopener"><FaTwitter/></a>
            <a href="https://showcase.ethglobal.com/hackmoney2022/sacredex-16z0d" target="_blank" rel="noreferrer noopener"><EthGlobalImage src={ethglobal} alt="ethglobal logo"/></a>
            </Links>
            <InfoRight>
                <p>{/* left empty so that I didn't have to modify all the code */}</p>
            </InfoRight>
        </Container>
    )
}
export default Footer;

const Container = styled.div`
  height: 20px;
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
const EthGlobalImage = styled.img`
  width: 15px;
  height: 15px;

  &:hover {
    color: #2a4e6e;
  }
  
`

// const InfoMiddle = styled.div`
//     margin-left: 10vw;
//   @media (max-width: 750px) {
//     margin-right: 2vw;
//   }
//   //make space between letters larger:
//   letter-spacing: 0.05rem;
//
// `

const InfoRight = styled.div`
  margin-right: calc(2vw);
  //make invisible for small screens
  @media (max-width: 750px) {
    display: none;
  }
  
`

