//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Exchange.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {

    //a mapping with an ERC20 token address on the one hand, and an exchange address on another.
    mapping(address=>address) public tokenToExchange;

    //function to create an exchange.
    function createExchange(address _tokenAddress) public onlyOwner returns (address) {
        require(_tokenAddress != address(0), "address is invalid");
        require(tokenToExchange[_tokenAddress] == address(0), "exchange already deployed for this token");

        Exchange exchange = new Exchange(_tokenAddress);
        tokenToExchange[_tokenAddress] = address(exchange);

        return address(exchange);
    }

    //function to add an exchange only by the owner.
    function manuallyAddExchange(address _tokenAddress, address _exchangeAddress) public onlyOwner {
        require(_tokenAddress != address(0), "address is invalid");
        require (_exchangeAddress != address(0), "address is invalid");
        require(tokenToExchange[_tokenAddress] == address(0), "exchange already deployed for this token");

        tokenToExchange[_tokenAddress] = _exchangeAddress;
    }


    //interfaces don't allow retrieving state variables, which is why we're building this function - for other contracts to interact with it
    function getExchange(address _tokenAddress) public view returns (address) {
        return tokenToExchange[_tokenAddress];
    }
}
