// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SacredCoin.sol";

/**
        * @dev This contract is a simple version of the Gratitude Coin contract deployed on the blockchain:
        */
contract GratitudeCoin is ERC20, SacredCoin {

    constructor(uint256 initialSupply) ERC20("GratitudeCoin", "GRTFUL") {
        ERC20._mint(msg.sender, initialSupply);

        /**
        * @dev calling the setGuideline function to create 1 guideline:
        */
        setGuideline("Think of something to be grateful for.", "Every time you buy, sell or otherwise use the coin, take a second to think of something that you are grateful for. It could be your family, your friends, the neighborhood you are living in or your pet tortoise. Ideally, you should think about something different that you're grateful for every time you use the coin.");
    }

    event SacredEvent(string sacredStatement);

    function _sacredMessage(string memory _name, string memory _message) public {
        emit SacredEvent(string(abi.encodePacked(_name, " is grateful for ", _message)));
    }

    function transferSacredOne(address _to, uint _tokens, string memory _name, string memory _message) public returns (bool) {
        super.transfer(_to, _tokens);
        _sacredMessage(_name, _message);
        return true;
    }

    function transferFromSacredOne(address _from, address _to, uint256 _amount, string memory _name, string memory _message) public returns (bool) {
        super.transferFrom(_from, _to, _amount);
        _sacredMessage(_name, _message);
        return true;
    }
}