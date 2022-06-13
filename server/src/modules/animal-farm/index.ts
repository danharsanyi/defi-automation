import { TransactionReceipt } from 'web3-core';
import { AnimalFarm, AnimalFarmOptions } from './animal-farm';
import { EthT } from '../eth/eth';

const MIN_BNB_BALANCE = 0.02;

async function run(eth: EthT, options: AnimalFarmOptions) {
  const {action} = options;
  const bnbBalanceRaw = await eth.getBalance();
  const bnbBalance = Number(bnbBalanceRaw) / 10**18; // There are 10^18 wei in an ether

  if (bnbBalance < MIN_BNB_BALANCE) {
    return 'BNB balance too low';
  };

  const animalFarm = await AnimalFarm(eth);
  let res: TransactionReceipt[];

  if (action === 'compound') {
    res = await animalFarm.compoundAll();
  }

  return res;
}

export default {
  run,
}
