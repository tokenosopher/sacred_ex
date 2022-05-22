require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require('dotenv').config()

const fs = require("fs");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function mnemonic() {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
          "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./src/contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts"
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/fce3430e645d4091bd6be9e972e6045f`,
      accounts: {
        mnemonic: mnemonic(),
      }
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: "U1XSIXWAQBET3IZMK9R68E29466CNNQZ7K"
    }
  }
};
