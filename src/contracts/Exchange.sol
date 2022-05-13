//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20Sacred.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IFactory {
    function getExchange(address _tokenAddress) external returns (address);
}

interface IExchange {
    function ethToTokenSwap(uint256 _minTokens) external payable;

    function ethToTokenTransfer(uint256 _minTokens, address _recipient) external payable;
}

contract Exchange is ERC20 {
    address public tokenAddress;
    address public factoryAddress;

    constructor (address _token) ERC20("Sacred-Dex-V1", "Sacrex-V1") {
        require(_token != address(0), "invalid token address");

        tokenAddress = _token;
    }


    //here you need to keep the reserve ratio constant - you don't want to mess with the reserve if the coin has already been deployed, b/c that would lead to arbitrage.
    //then, if your ratio is (token reserve / eth reserve) you multiply the result with the value of tokens with the ratio in order to get the amount of tokens that you have to deposit.
    function addLiquidity(uint256 _tokenAmount) public payable returns (uint256){
        IERC20Sacred tokenToShip = IERC20Sacred(tokenAddress);

        if (getReserve() == 0) {
            tokenToShip.transferFrom(msg.sender, address(this), _tokenAmount);


            //if the reserve is 0, then amount of LP tokens minted will be equal to the amount of eth sent.
            uint256 liquidity = address(this).balance;

            _mint(msg.sender, liquidity);

            return liquidity;
        }

        else {

            //getting the eth reserve but removing the amount sent, as this is already in the contract.
            uint256 ethReserve = address(this).balance - msg.value;

            //getting the token reserve:
            uint256 tokenReserve = getReserve();

            //any reason why the parenthesis should be in a different position - or be there at all?
            uint256 tokenAmount = msg.value * (tokenReserve / ethReserve);

            //the token amount specified by the user needs to be at least as much as the amount that was calculated based on how much eth was transferred.
            require(_tokenAmount >= tokenAmount, "not enough tokens for the transfer");

            //calling the transferFrom function:
            tokenToShip.transferFrom(msg.sender, address(this), tokenAmount);

            //minting the liquidity based on the formula from Uniswap that the LP tokens are total supply of LP tokens already in circulation * (provided eth / eth reserve)
            uint256 liquidity = (totalSupply() * msg.value) / ethReserve;
            _mint(msg.sender, liquidity);

            return liquidity;

        }

    }

    function getReserve() public view returns (uint256) {
        return IERC20Sacred(tokenAddress).balanceOf(address(this));
    }


    //low level function that calculates the amount received when swapping - uses the constant product formula
    function getAmount(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) private pure returns (uint256) {

        //one of the two values is going to be address(this).balance
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");

        //getting the input amount with a fee - by multiplying both the numerator and the denominator by a power of 10. The fee in this case is 1%, but it can be modified. A fee of 0.03% for example will be multiplying by a factor of 100 and the inputAmountWithFee would be multiplied by 997.
        uint256 inputAmountWithFee = inputAmount * 99;

        uint256 numerator = inputAmountWithFee * outputReserve;

        uint256 denominator = (inputReserve * 100) + inputAmountWithFee;

        return numerator / denominator;

        //original formula - when no fee is present:
        //        return (inputAmount * outputReserve) / (inputReserve + inputAmount);
    }

    //function that uses the getAmount function to calculate the amount of tokens received when swapping a certain
    //amount of eth
    function getTokenAmount(uint256 _ethSold) public view returns (uint256) {
        require(_ethSold > 0, "amount needs to be above 0");

        //get reserve of the token, which is needed to calcualte the amount:
        uint256 tokenReserve = getReserve();

        //calling getAmount with the information available:
        return getAmount(_ethSold, address(this).balance, tokenReserve);
    }

    //the reverse of the function above:
    function getEthAmount(uint256 tokenSold) public view returns (uint256) {
        require(tokenSold > 0, "amount needs to be above 0");

        uint256 tokenReserve = getReserve();

        return getAmount(tokenSold, tokenReserve, address(this).balance);
    }

    //the function that allows swapping eth for tokens, using the functions above:
    function ethToToken(uint256 _minTokens, address _recipient) private {
        //getting the reserve:
        uint256 tokenReserve = getReserve();

        //calculating how many tokens we would be getting
        //notice that the value provided by the user is subtracted from the balance
        //that's because by the time this function is called, the balance of the contract
        //would have already included the eth that the user sent to the contract:
        uint256 tokensBought = getAmount(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve);

        //require that the _minTokens, which is calculated on the frontend and decided on by the user,
        //is lower or equal to the tokens bought, so that the user doesn't get screwed.
        require(tokensBought >= _minTokens, "slippage out of bounds");

        //transfer the tokens to the user if the require statement above checks out, using the
        //values we've retrieved.
        IERC20Sacred(tokenAddress).transfer(_recipient, tokensBought);
    }

    //the function that allows swapping eth for tokens, using the functions above, with a sacred message:
    function ethToTokenSacredOne(uint256 _minTokens, address _recipient, string memory _name, string memory _message) private {
        //getting the reserve:
        uint256 tokenReserve = getReserve();

        //calculating how many tokens we would be getting
        //notice that the value provided by the user is subtracted from the balance
        //that's because by the time this function is called, the balance of the contract
        //would have already included the eth that the user sent to the contract:
        uint256 tokensBought = getAmount(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve);

        //require that the _minTokens, which is calculated on the frontend and decided on by the user,
        //is lower or equal to the tokens bought, so that the user doesn't get screwed.
        require(tokensBought >= _minTokens, "slippage out of bounds");

        //transfer the tokens to the user if the require statement above checks out, using the
        //values we've retrieved.
        IERC20Sacred(tokenAddress).transferSacredOne(_recipient, tokensBought, _name, _message);
    }


    //function that uses ethToToken to transfer to msg.sender
    function ethToTokenSwap(uint256 _minTokens) public payable {
        ethToToken(_minTokens, msg.sender);
    }

    //function that uses ethToToken to transfer to msg.sender
    function ethToTokenSwapSacredOne(uint256 _minTokens, string memory _name, string memory _message) public payable {
        ethToTokenSacredOne(_minTokens, msg.sender, _name, _message);
    }

    function ethToTokenTransfer(uint256 _minTokens, address _recipient) public payable {
        ethToToken(_minTokens, _recipient);
    }

    function ethToTokenTransferSacredOne(uint256 _minTokens, address _recipient, string memory _name, string memory _message) public payable {
        ethToTokenSacredOne(_minTokens, _recipient, _name, _message);
    }

    function tokenToEthSwap(uint256 _tokensSold, uint256 _minEth) public {

        //getting the amount of eth that will be bought:
        uint256 ethBought = getAmount(
            _tokensSold,
            IERC20Sacred(tokenAddress).balanceOf(address(this)),
            address(this).balance);

        //require that the _minEth, which is calculated on the frontend and decided on by the user,is lower or equal to the eth bought, so that the user doesn't get screwed.
        require(ethBought >= _minEth, "slippage out of bounds");

        //transferring the tokens to the exchange:
        //do not need to have a require statement because transferFrom throws exception in case balance is insufficient.
        IERC20Sacred(tokenAddress).transferFrom(msg.sender, address(this), _tokensSold);

        //transferring eth to sender:
        (bool success,) = msg.sender.call{value : ethBought}("");

        //require that the transfer is successful:
        require(success, "Eth transfer failed");
    }

    function tokenToEthSwapSacredOne(uint256 _tokensSold, uint256 _minEth, string memory _name, string memory _message) public {

        //getting the amount of eth that will be bought:
        uint256 ethBought = getAmount(
            _tokensSold,
            IERC20Sacred(tokenAddress).balanceOf(address(this)),
            address(this).balance);

        //require that the _minEth, which is calculated on the frontend and decided on by the user,is lower or equal to the eth bought, so that the user doesn't get screwed.
        require(ethBought >= _minEth, "slippage out of bounds");

        //transferring the tokens to the exchange:
        //do not need to have a require statement because transferFrom throws exception in case balance is insufficient.
        IERC20Sacred(tokenAddress).transferFromSacredOne(msg.sender, address(this), _tokensSold, _name, _message);

        //transferring eth to sender:
        (bool success,) = msg.sender.call{value : ethBought}("");

        //require that the transfer is successful:
        require(success, "Eth transfer failed");
    }



    //takes the amount of tokens to be exchanged
    //using the checks-effects-interactions pattern to create the architecture:
    function removeLiquidity(uint256 _amount) public returns (uint256, uint256) {
        require(_amount > 0, "needs to be larger than 0");

        uint ethAmount = (address(this).balance * _amount) / totalSupply();
        uint tokenAmount = (getReserve() * _amount) / totalSupply();

        //burn the tokens:
        _burn(msg.sender, _amount);

        //transfer the eth to the person calling the function:
        payable(msg.sender).transfer(ethAmount);

        //transfer the ERC20 tokens to the person calling the amount:
        IERC20Sacred(tokenAddress).transfer(msg.sender, tokenAmount);

        return (ethAmount, tokenAmount);
    }

    //function that allows swapping between tokens by first converting the tokens from this exchange to eth
    function tokenToTokenSwap(
        uint256 _tokensSold,
        uint256 _minTokensBought,
        address _tokenAddress
    ) public {

        address exchangeAddress = IFactory(factoryAddress).getExchange(_tokenAddress);

        require(
        exchangeAddress != address(this) && exchangeAddress != address(0),
        "exchange address invalid"
    );

        //getting the amount of eth that can be bought with the token amount provided:
        uint256 ethBought = getAmount(
            _tokensSold,
            IERC20Sacred(tokenAddress).balanceOf(address(this)),
            address(this).balance);

        IExchange(_tokenAddress).ethToTokenTransfer{value: ethBought}(_minTokensBought, msg.sender);
    }
}
