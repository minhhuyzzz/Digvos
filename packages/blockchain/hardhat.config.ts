import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const accounts = [];
if (process.env.RELAYER_PRIVATE_KEY && process.env.RELAYER_PRIVATE_KEY.length === 64) {
  accounts.push(process.env.RELAYER_PRIVATE_KEY);
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {},
    amoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "",
      accounts: accounts,
    }
  }
};

export default config;
