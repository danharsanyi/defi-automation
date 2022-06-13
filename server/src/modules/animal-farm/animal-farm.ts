import config from '../../config/index';
import { EthT } from '../eth/eth';

export type AnimalFarmOptions = {
  action: 'compound'
}

// Will only compound up to 4 Stakes
const stakes = [
  '0xc337aa5d0000000000000000000000000000000000000000000000000000000000000000',
  '0xc337aa5d0000000000000000000000000000000000000000000000000000000000000001',
  '0xc337aa5d0000000000000000000000000000000000000000000000000000000000000002',
  '0xc337aa5d0000000000000000000000000000000000000000000000000000000000000003'
]

export const AnimalFarm = async(eth: EthT) => {
  async function execute(stake: string) {
    const signedTxn = await eth.signTransaction(config.animalFarmPiggyBankContractAddress, stake);
    return await eth.sendSignedTransaction(signedTxn.rawTransaction);
  }

  return {
    compoundAll: async() => await Promise.all(stakes.map(stake => execute(stake))),
  }
}
