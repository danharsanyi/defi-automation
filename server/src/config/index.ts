import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 8080,
  dripContractAddress: process.env.DRIP_CONTRACT_ADDRESS,
  bscChain: process.env.BSC_CHAIN,
}
