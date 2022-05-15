// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
// include node fs module
var fs = require('fs');

const {ethers} = require("hardhat");


async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    // const Greeter = await hre.ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, Hardhat!");
    //
    // await greeter.deployed();
    //
    // console.log("Greeter deployed to:", greeter.address);

    function weiFromEther(amount) {
        return ethers.utils.parseUnits(amount)
    }

    function etherFromWei(amount) {
        return ethers.utils.formatEther(amount)
    }

    // We get the contract to deploy
    const Factory = await hre.ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();
    //
    await factory.deployed();
    //
    console.log("Factory deployed to:", factory.address);

    //get the General Peace Token contract to deploy:
    const GeneralPeaceToken = await hre.ethers.getContractFactory("GeneralPeaceToken");
    const generalPeaceToken = await GeneralPeaceToken.deploy(weiFromEther("1000000"));

    await generalPeaceToken.deployed();

    console.log("GeneralPeaceToken deployed to:", generalPeaceToken.address);

    //get the exchange contract to deploy:
    const Exchange = await hre.ethers.getContractFactory("Exchange");
    const gepetoExchange = await Exchange.deploy(generalPeaceToken.address);

    await gepetoExchange.deployed();

    console.log("GEPETO exchange deployed to:", gepetoExchange.address);

    //adding the generalpeacetoken exchange to the factory address:
    await factory.manuallyAddExchange(generalPeaceToken.address, gepetoExchange.address)

    //approve 500 tokens for the exchange address:
    await generalPeaceToken.approve(gepetoExchange.address, weiFromEther("500"))

    //adding the liquidity with 500 general peace tokens and 10 eth:
    await gepetoExchange.addLiquidity(weiFromEther("500"), {value:weiFromEther("10")})

    //get the Gratitude Coin address to deploy:
    const GratitudeCoin = await hre.ethers.getContractFactory("GratitudeCoin");
    const gratitudeCoin = await GratitudeCoin.deploy(weiFromEther("1000000"));

    await gratitudeCoin.deployed();

    console.log("GratitudeCoin deployed to:", gratitudeCoin.address);

    //get the exchange contract to deploy:
    const grtfulExchange = await Exchange.deploy(gratitudeCoin.address);

    await grtfulExchange.deployed();

    console.log("GRTFUL exchange deployed to:", grtfulExchange.address);

    //adding the gratitudecoin exchange to the factory address:
    await factory.manuallyAddExchange(gratitudeCoin.address, grtfulExchange.address)

    //approve 500 tokens for the exchange address:
    await gratitudeCoin.approve(grtfulExchange.address, weiFromEther("500"))

    //adding the liquidity with 500 gratitude coins and 10 eth:
    await grtfulExchange.addLiquidity(weiFromEther("500"), {value:weiFromEther("10")})

    //creating a json file with the addresses of the deployed contracts:
    const contractAddresses = {
        factoryAddress: factory.address,
        generalPeaceTokenAddress: generalPeaceToken.address,
        gepetoExchangeAddress: gepetoExchange.address,
        gratitudeCoinAddress: gratitudeCoin.address,
        grtfulExchangeAddress: grtfulExchange.address
    };


// writing the contractAddressses to a json file that is then loaded into react via tokens.js:
    fs.writeFileSync(
        './src/artifacts/src/contract_addresses/contractAddresses.json',
        JSON.stringify(contractAddresses),
        function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
