import config from '../../config/index.js';
import abi from './abi.json' assert {type: 'json'};
import { EthT } from '../eth/eth.js';

export type DripOptions = {
  action: 'hydrate' | 'claim';
}

export const Drip = async(eth: EthT) => {
  const contract = await eth.loadContract(abi, config.dripContractAddress);
  const wallet = await eth.getWallet();

  const {address} = wallet;

  const hydrateAbi = await contract.methods.roll().encodeABI();
  const claimAbi = await contract.methods.claim().encodeABI();

  async function execute(abi: string) {
    const signedTxn = await eth.signTransaction(config.dripContractAddress, abi);
    return await eth.sendSignedTransaction(signedTxn.rawTransaction);
  }

  return {
    userInfo: async() => await contract.methods.userInfo(address).call(),
    hydrate: async() => await execute(hydrateAbi),
    claim: async() => await execute(claimAbi),
  }
}