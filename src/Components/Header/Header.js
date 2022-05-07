import React from 'react';
import styled from 'styled-components';
import sacred_logo from '../../assets/images/sacred_logo.png'

const Header = () => {

    return (
        <Nav>
            <Logo src={sacred_logo} />
            <MidMenu>
                <li>
                    <a href={"#"} > Swap</a>
                    <a href={"#"} > Pool</a>
                </li>
            </MidMenu>
            <RightMenu>
                <li>
                    <a> Polygon </a>
                    <a> Connect Wallet</a>
                    <a>...</a>
                </li>

            </RightMenu>
        </Nav>
    )
}
export default Header;


const Nav = styled.nav`
  width: 100vw;
  height: 70px;
  color: white;
  display: flex;
  align-items: center;
  //create equal distance between elements
  justify-content: space-between;
`

const Logo = styled.img`
  margin-left:30px;
  height: 30px;
`

const MidMenu = styled.div`
  
  li {
    list-style-type: none;
  }
  
  //create space between the a tags:
  a {
    margin-right: 20px;
    //remove underline:
    text-decoration: none;
    color: white;
    //remove the dot from the a tag
  }`

const RightMenu = styled(MidMenu)`
  

`