import { SignedTransaction, TransactionReceipt } from 'web3-core';
import { Drip, DripOptions } from './drip.js';
import { EthT } from '../../modules/eth/eth.js';

const MIN_BNB_BALANCE = 0.02;

async function run(eth: EthT, options: DripOptions) {
  const {action} = options;
  const bnbBalanceRaw = await eth.getBalance();
  const bnbBalance = Number(bnbBalanceRaw) / 10**18; // There are 10^18 wei in an ether

  if (bnbBalance < MIN_BNB_BALANCE) {
    return 'BNB balance too low';
  };

  const drip = await Drip(eth);
  let res: SignedTransaction;

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