//SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SacredCoin.sol";

contract GeneralPeaceToken is ERC20, SacredCoin {


    //sacred event
    event SacredEvent(string SacredMessage);

    constructor(uint256 initialSupply) ERC20("General Peace Token", "GEPETO") {
        ERC20._mint(msg.sender, initialSupply);

        //guideline 1
        setGuideline("Share a message of peace", "Every time you buy or sell the coin, write a message on the blockchain that you think will inspire worldwide peace. It can be an personal story that inspires worldwide peace, or an inspiring note.");
    }

    function _SacredMessage(string memory _name, string memory _message) private {
        emit SacredEvent(string(abi.encodePacked(_name, "'s message of peace is", _message)));
    }

    function transferSacredOne(address _to, uint _tokens, string memory _name, string memory _message) public returns (bool) {
        super.transfer(_to, _tokens);
        _SacredMessage(_name, _message);
        return true;
    }

    function transferFromSacredOne(address _from, address _to, uint256 _amount, string memory _name, string memory _message) public returns (bool) {
        super.transferFrom(_from, _to, _amount);
        _SacredMessage(_name, _message);
        return true;
    }
}
