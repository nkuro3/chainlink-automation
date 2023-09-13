require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.19",
	networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_ALCHEMY_API_KEY
			? `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_API_KEY}`
			: `https://rpc.sepolia.org`,
      accounts: [process.env.DEV_ACCOUNT_PRIVATE_KEY],
    },
  },
};
