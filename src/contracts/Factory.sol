//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Exchange.sol";

contract Factory {

    //a mapping with an ERC20 token address on the one hand, and an exchange address on another.
    mapping(address=>address) public tokenToExchange;

    //function to create an exchange.
    function createExchange(address _tokenAddress) public returns (address) {
        require(_tokenAddress != address(0), "address is invalid");
        require(tokenToExchange[_tokenAddress] == address(0), "exchange already deployed for this token");

        Exchange exchange = new Exchange(_tokenAddress);
        tokenToExchange[_tokenAddress] = address(exchange);

        return address(exchange);
    }

    //interfaces don't allow retrieving state variables, which is why we're building this function - for other contracts to interact with it
    function getExchange(address _tokenAddress) public view returns (address) {
        return tokenToExchange[_tokenAddress];
    }



}
