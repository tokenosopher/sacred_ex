import React from 'react';
import styled from 'styled-components'
import {BsGear} from 'react-icons/bs'

const Swap = () => {

    return (
        <Container>
            <MiniHeader>
                <HeaderText>Swap</HeaderText>
                <GearWrapper>
                    <BsGear/>
                </GearWrapper>
            </MiniHeader>
            <SwapColumnOne>
                <InputWrapper>
                    <InputFieldOne type="number" placeholder="0.0"/>
                </InputWrapper>
            </SwapColumnOne>
            <SwapColumnTwo>
                <InputWrapper>
                    <InputFieldTwo type="number" placeholder="0.0"/>
                </InputWrapper>
            </SwapColumnTwo>
            <ButtonOption>Connect Wallet</ButtonOption>

        </Container>
    )
}
export default Swap;


const Container = styled.div`
  color:white;
  display: flex;
  //column:
  flex-direction: column;
  height: 286px;
  width: 480px;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  //flex space between:
  //flex-wrap: space-between;
`

const MiniHeader = styled.div`
  display:flex;
  justify-content: space-between;
`
const HeaderText = styled.div`
  //up right down left
  margin: 10px 10px 0 10px;
`

const GearWrapper = styled(HeaderText)`
`


const SwapColumnOne = styled.div``

const InputWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  margin: 0 10px;
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

  //create a white border on hover:
  &:hover {
    border: 1px solid #737373;
  }
`

const InputFieldTwo = styled(InputFieldOne)``

const SwapColumnTwo = styled.div``

const ButtonOption = styled.div`
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
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #4680d0;
  }

  &:active {
    color: white;
    background-color: #335273;
  }
`