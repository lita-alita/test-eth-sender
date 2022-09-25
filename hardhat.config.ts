import { HardhatUserConfig } from "hardhat/types";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {

      },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.13",
      },
    ],
  },
};

export default config;
