import { TransactionReceipt } from 'web3-core';
import { Drip, DripOptions } from './drip';
import { EthT } from '../../modules/eth/eth';

const MIN_BNB_BALANCE = 0.02;

async function run(eth: EthT, options: DripOptions) {
  const {action} = options;
  const bnbBalanceRaw = await eth.getBalance();
  const bnbBalance = Number(bnbBalanceRaw) / 10**18; // There are 10^18 wei in an ether

  if (bnbBalance < MIN_BNB_BALANCE) {
    return 'BNB balance too low';
  };

  const drip = await Drip(eth);
  let res: TransactionReceipt;

  if (action === 'hydrate') {
    res = await drip.hydrate();
  } else if (action === 'claim') {
    res = await drip.claim();
  }

  return res;
}

export default {
  run,
}