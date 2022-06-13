import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 8080,
  dripContractAddress: process.env.DRIP_CONTRACT_ADDRESS,
  dripSlackNotifyUrl: process.env.DRIP_SLACK_NOTIFY_URL,
  bscChain: process.env.BSC_CHAIN,
}
