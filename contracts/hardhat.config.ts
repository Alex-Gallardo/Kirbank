import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
	solidity: "0.8.17",
	defaultNetwork: "hardhat",
	// - - - - - Redes - - - - -
	networks: {
		hardhat: {
			chainId: 1337
		},
		goerli: {
			accounts: [process.env.OWNER_KEY!],
			url: process.env.PROYECT_ALCHEMY_KEY
		}
	}
};

export default config;
