require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");
require('dotenv').config();

const { INFURA_API_KEY, SEPOLIA_PRIVATE_KEY, LOCALHOST_PORT, LOCALHOST_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    localhost: {
      url: `http://127.0.0.1:${LOCALHOST_PORT}/`,
      accounts: [LOCALHOST_PRIVATE_KEY]
    }
  },
};
