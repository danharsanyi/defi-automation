import Web3 from 'web3';
import { Account, AddedAccount, SignedTransaction, TransactionReceipt } from 'web3-core';
import { Contract } from 'web3-eth-contract';

export type EthOptions = {
  wallet: string;
  key: string;
  chain: string;
}

export type EthT ={
  getWallet: () => Promise<Account>,
  getBalance: () => Promise<string>,
  loadContract: (abi: any, address: string) => Promise<Contract>,
  signTransaction: (to: string, data: string) => Promise<SignedTransaction>,
  sendSignedTransaction: (rawTransaction: string) => Promise<TransactionReceipt>,
}

export const Eth = (options: EthOptions): EthT => {
  const {chain, wallet, key} = options;
  const web3 = new Web3(chain);

  async function loadWallet(): Promise<AddedAccount> {
    return await web3.eth.accounts.wallet.add({
      privateKey: key,
      address: wallet,
    });
  }
  
  async function getWallet(): Promise<Account> {
    return await web3.eth.accounts.wallet[0];
  }

  async function getNonce(wallet: Account) {
    return await web3.eth.getTransactionCount(wallet.address);
  }

  (async function init() {
    await loadWallet();
  })();

  return {
    getWallet: async() => await getWallet(),
    getBalance: async() => {
      const wallet = await getWallet();
      return await web3.eth.getBalance(wallet.address);
    },
    loadContract: async(abi: any, address: string) => new web3.eth.Contract(abi, address),
    signTransaction: async(to: string, data: string) => {
      const wallet = await getWallet();
      const nonce = await getNonce(wallet);

      return await wallet.signTransaction({
        nonce,
        to,
        gas: 500000,
        gasPrice: web3.utils.toWei('5', 'gwei'),
        data,
      });
    },
    sendSignedTransaction: async(rawTransaction: string) => await web3.eth.sendSignedTransaction(rawTransaction),
  }
}