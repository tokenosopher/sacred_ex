const {expect} = require("chai");
const {ethers} = require("hardhat");

function weiFromEther(amount) {
    return ethers.utils.parseUnits(amount)
}

function etherFromWei(amount) {
    return ethers.utils.formatEther(amount)
}


describe("Exchange", async () => {

    let token

    let exchange

    const initialSupply = weiFromEther("10000")

    beforeEach(async () => {

        [owner, acc1, acc2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory('Token')
        token = await Token.deploy("Token", "TKN", initialSupply)
        await token.deployed()

        const Exchange = await ethers.getContractFactory('Exchange')
        exchange = await Exchange.deploy(token.address)
        await exchange.deployed()
    });

    it("should add liquidity", async () => {
        //the amount to be transferred to the exchange
        const ethAmount = weiFromEther("10")
        const tokenAmount = weiFromEther("500")

        //approving the exchange to transfer the tokens
        await token.approve(exchange.address, tokenAmount)

        //transferring the tokens to the exchange
        await exchange.addLiquidity(tokenAmount, {value: ethAmount})

        //retrieving the balance of the exchange
        const tokenBalance = await token.balanceOf(exchange.address)

        //checking if the balance is equal to the amount
        expect(tokenBalance.toString()).to.equal(tokenAmount.toString())

        //checking that the getReserve function returns the correct amount of tokens:
        const tokenReserve = await exchange.getReserve()
        expect(tokenReserve.toString()).to.equal(tokenAmount.toString())

        //checking that the exchange has the right amount of eth:
        const exchangeEthBalance = await ethers.provider.getBalance(exchange.address);
        expect(exchangeEthBalance).to.equal(ethAmount)
    })

    describe("additional reserves", async () => {
        const ethAmount = weiFromEther("10")
        const approvedTokenAmount = weiFromEther("500")
        const initialTransferTokenAmount = weiFromEther("10")

        beforeEach(async () => {

            //approving the exchange to transfer the tokens
            await token.approve(exchange.address, approvedTokenAmount)

            //transferring the tokens to the exchange
            await exchange.addLiquidity(initialTransferTokenAmount, {value: ethAmount})
        })

        it("adds additional liquidity while preserving the exchange rate", async () => {
            //defining the values for the eth and tokens that are to be transferred
            const extraEthAmount = weiFromEther("2")
            const extraTokenAmount = weiFromEther("30")

            //initial values were 10 eth and 10 tokens (from beforeEachSync)
            //so adding 2 more eth should mean adding two more tokens, because 2 * 10/10 = 2
            //which means that total should be 12 tokens.
            await exchange.addLiquidity(extraTokenAmount, {value: extraEthAmount})

            //calling get balance to get balance of the token:
            const totalTokens = await token.balanceOf(exchange.address)

            //calling the balanceOf function to check the balance of eth:
            //get the balance of the exchange
            const exchangeEthBalance = await ethers.provider.getBalance(exchange.address);

            expect(totalTokens.toString()).to.equal(weiFromEther("12").toString())

            //checking that the exchange eth is equal to 12:
            expect(exchangeEthBalance).to.equal(weiFromEther("12"))

            // console.log("total tokens are equal to " + etherFromWei(totalTokens.toString()))

            // expect(await token.balanceOf(exchange.address)).to.equal(tokenAmount.add(extraTokenAmount))
        })

        it("should add proportional liquidity after the initial add", async () => {
            const ethAmount = weiFromEther("5")
            const tokenAmount = weiFromEther("500")

            //approving the exchange to transfer the tokens
            await token.approve(exchange.address, tokenAmount)

            //transferring the tokens to the exchange
            await exchange.addLiquidity(tokenAmount, {value: ethAmount})

            //retrieving the balance of the exchange
            const tokenBalance = await token.balanceOf(exchange.address)

            //check that the balance of the exchange for the token is 15, after adding the 5 eth:
            expect(tokenBalance.toString()).to.equal(weiFromEther("15").toString())

            //check that the eth balance of the exchange is 15, after adding the 5 eth:
            const exchangeEthBalance = await ethers.provider.getBalance(exchange.address);
            expect(exchangeEthBalance).to.equal(weiFromEther("15"))
        })

    })

    describe("checking the ethToTokenSwap function", async () => {
        const ethAmount = weiFromEther("10")
        const tokenAmount = weiFromEther("500")

        beforeEach(async () => {
            //approving the exchange to transfer the tokens
            await token.approve(exchange.address, tokenAmount)

            //transferring the tokens to the exchange
            await exchange.addLiquidity(tokenAmount, {value: ethAmount})
        })

        it("swaps the eth for the tokens", async () => {
            const ethAmountToSwap = weiFromEther("5")
            const minTokens = weiFromEther("1")


            //swapping the eth for the tokens
            await exchange.connect(acc1)
                .ethToTokenSwap(minTokens, {value: ethAmountToSwap})

            //retrieving the balance of the exchange
            const tokenBalance = await token.balanceOf(acc1.address)

            // console.log("token balance is " + etherFromWei(tokenBalance.toString()))

            //check that the balance of the exchange for the token is 165.551839464882943143, after adding the 5 eth:
            expect(tokenBalance.toString()).to.equal(weiFromEther("165.551839464882943143").toString())

            //check that the balance of the exchange for eth is 15, after adding the 5 eth:
            const exchangeEthBalance = await ethers.provider.getBalance(exchange.address);
            expect(exchangeEthBalance).to.equal(weiFromEther("15"))
        })

        it("should revert if the user tries to swap less than the minimum amount", async () => {
            const ethAmountToSwap = weiFromEther("1")
            const minTokens = weiFromEther("300")

            await expect(
                exchange.connect(acc1)
                    .ethToTokenSwap(minTokens, {value: ethAmountToSwap})
            ).to.be.revertedWith("slippage out of bounds")
        })

        it("should affect the exchange rate", async () => {
            const ethAmountToSwap = weiFromEther("5")
            const minTokens = weiFromEther("1")

            //retrieving the rate of the exchange
            const ethExchangeRateInitial = await exchange.getTokenAmount(ethAmountToSwap)
            const tokenExchangeRateInitial = await exchange.getEthAmount(minTokens)

            // //console log the rate:
            // console.log("initial eth exchange rate is " + etherFromWei(ethExchangeRateInitial.toString()))
            // console.log("initial token exchange rate is " + etherFromWei(tokenExchangeRateInitial.toString()))

            //swapping the eth for the tokens
            await exchange.connect(acc1)
                .ethToTokenSwap(minTokens, {value: ethAmountToSwap})

            //retrieving the balance of the exchange
            const ethExchangeRateFinal = await exchange.getTokenAmount(ethAmountToSwap)
            const tokenExchangeRateFinal = await exchange.getEthAmount(minTokens)

            // //console log the rate:
            // console.log("final eth exchange rate is " + etherFromWei(ethExchangeRateFinal.toString()))
            // console.log("final token exchange rate is " + etherFromWei(tokenExchangeRateFinal.toString()))

            //check that the initial exchange rate is different from the final exchange rate
            expect(ethExchangeRateInitial.toString()).to.not.equal(ethExchangeRateFinal.toString())
            expect(tokenExchangeRateInitial.toString()).to.not.equal(tokenExchangeRateFinal.toString())
        })
    })

    describe("check the tokenToEthSwap function", () => {
        const ethAmount = weiFromEther("10")
        const tokenAmount = weiFromEther("500")

        beforeEach(async () => {
            //approving the exchange to transfer the tokens
            await token.approve(exchange.address, tokenAmount)

            //transferring the tokens to the exchange
            await exchange.addLiquidity(tokenAmount, {value: ethAmount})

            //transferring some tokens to acc1:
            await token.transfer(acc1.address, tokenAmount)

        })

        it("should swap the tokens for eth", async () => {

            const tokenAmountToSwap = weiFromEther("200")
            const minEther = weiFromEther("1")


            //approving the tokens from acc1 for the exchange to transfer them:
            await token
                .connect(acc1)
                .approve(exchange.address, tokenAmountToSwap)

            //checking the balance of acc1 before the swap:
            const acc1TokenBalanceBeforeSwap = await token.balanceOf(acc1.address)

            //console log the eth balance for acc1 before the swap with ethers:
            const acc1EtheBalanceBeforeSwap = await ethers.provider.getBalance(acc1.address)
            // console.log("acc1 eth balance before swap is " + etherFromWei(acc1EtheBalanceBeforeSwap.toString()))


            //swapping the tokens for eth
            await exchange.connect(acc1)
                .tokenToEthSwap(tokenAmountToSwap, minEther)

            //retrieving the balance of the exchange
            // const tokenBalance = await token.balanceOf(exchange.address)
            // const ethBalance = await ethers.provider.getBalance(exchange.address)

            // //console log the balance:
            // console.log("token balance is " + etherFromWei(tokenBalance.toString()))
            // console.log("eth balance is " + etherFromWei(ethBalance.toString()))

            //checking eth balance for acc1:
            const ethBalanceAcc1 = await ethers.provider.getBalance(acc1.address)


            //substracting the final eth balance for acc1 from the initial eth balance for acc1:
            const ethBalanceDifferenceAfterSwap = etherFromWei(ethBalanceAcc1) - etherFromWei(acc1EtheBalanceBeforeSwap)

            //expect that the ethBalanceAfterSwap for acc1 is between 2.8 and 2.9 (bc of gas fees):
            expect(ethBalanceDifferenceAfterSwap).to.be.within(2.8, 2.9)

            //checking the token balance for acc1:
            const acc1TokenBalanceAfterSwap = await token.balanceOf(acc1.address)

            //expect that the token balance for acc1 is now 300 eth:
            expect(acc1TokenBalanceAfterSwap.toString()).to.equal(weiFromEther("300"))


            // //console log the balance:
            // console.log("eth balance for acc1 after swap is " + etherFromWei(ethBalanceAcc1.toString()))
        })

        it("should change the exchange rate", async () => {

            const tokenAmountToSwap = weiFromEther("200")
            const minEther = weiFromEther("1")


            const ethAmountToSwap = weiFromEther("5")
            const tokensToSwap = weiFromEther("1")

            //approving the tokens from acc1 for the exchange to transfer them:
            await token
                .connect(acc1)
                .approve(exchange.address, tokenAmountToSwap)

            //retrieving the rate of the exchange
            const ethExchangeRateInitial = await exchange.getTokenAmount(ethAmountToSwap)
            const tokenExchangeRateInitial = await exchange.getEthAmount(tokenAmountToSwap)

            //console log the rate:
            console.log("initial eth exchange rate is " + etherFromWei(ethExchangeRateInitial.toString()))
            console.log("initial token exchange rate is " + etherFromWei(tokenExchangeRateInitial.toString()))

            //swapping the tokens for the eth
            await exchange.connect(acc1)
                .tokenToEthSwap(tokenAmountToSwap, minEther)

            //retrieving the balance of the exchange
            const ethExchangeRateFinal = await exchange.getTokenAmount(ethAmountToSwap)
            const tokenExchangeRateFinal = await exchange.getEthAmount(tokenAmountToSwap)

            //console log the rate:
            console.log("final eth exchange rate is " + etherFromWei(ethExchangeRateFinal.toString()))
            console.log("final token exchange rate is " + etherFromWei(tokenExchangeRateFinal.toString()))

            //check that the initial exchange rate is different from the final exchange rate
            expect(ethExchangeRateInitial.toString()).to.not.equal(ethExchangeRateFinal.toString())
            expect(tokenExchangeRateInitial.toString()).to.not.equal(tokenExchangeRateFinal.toString())


        })
    })

    // it("should get the correct eth amount", async () => {
    //     //the amount of tokens to be transferred to the exchange
    //     const tokenAmount = weiFromEther("10")
    //
    //     //the amount of ether to be transffered:
    //     const etherAmount = weiFromEther("8")
    //
    //     //approving the exchange to transfer the tokens
    //     await token.approve(exchange.address, tokenAmount)
    //
    //     //transferring the tokens:
    //     await exchange.transferTokens(tokenAmount, {value: etherAmount})
    //
    //
    //     //checking the balance of the contract:
    //     const balance = await ethers.provider.getBalance(exchange.address)
    //
    //     //expecting the balance to equal the amount of ether that was transferred:
    //     expect(balance.toString()).to.equal(etherAmount.toString())
    //
    //
    //     //checking the amount of ether from tokens:
    //     const howMuchEthForTokens = await exchange.getEthAmount(weiFromEther("10"))
    //
    //
    //     //calculating the amount 'by hand':
    //     const calculateAmount = tokenAmount.mul(etherAmount).div(tokenAmount.add(weiFromEther("10")))
    //
    //     //
    //     console.log(calculateAmount.toString())
    //
    //     console.log(etherFromWei(howMuchEthForTokens))
    // })


})