"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import Send from "@/public/abis/Send.json";

const BlockchainContext = createContext();

export const useWeb3 = () => useContext(BlockchainContext);

export function Web3Provider({ children }) {

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState(null);

  useEffect(() => {
    async function initializeWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        const contractAddress = '0xEc22482EC9Db0d094D81343239d810BD235ca91f';
        const contractInstance = new web3Instance.eth.Contract(Send, contractAddress);
        setContract(contractInstance);
      } else {
        alert("Please install MetaMask!");
      }
    }

    initializeWeb3();
  }, []);

  async function connectMetamask() {
    if (window.ethereum && web3) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      try {
        await window.ethereum.request({
          "method": "wallet_switchEthereumChain",
          "params": [{
              "chainId": "0xaa36a7",
          }]})
          setConnectedAccount(accounts[0]);
      } catch (e) {
        if (e.code === 4902) {
          alert("Please switch to Sepolia chain!")
        }
      }
    } else {
      alert('Please install MetaMask and try again');
    }
  }

  async function send(receiver, valueInEth) {
    try {
      if (contract && connectedAccount) {
        const transaction = await contract.methods.send(receiver).send({ from: connectedAccount, value: Web3.utils.toWei(valueInEth, 'ether') });
  
        const event = transaction.events.Sent;
  
        if (event) {
          const { _amount, _receiver, _sender, _uid } = event.returnValues;
          const amount = Web3.utils.fromWei(_amount, 'ether')
          const uid = Number(_uid)
          return { amount, _receiver, _sender, uid };
        } else {
          return null;
        }
      }
    } catch {
      return null
    }
  }

  async function getTxDetails(uid) {
    if (contract) {
      const tx = await contract.methods.getTxDetails(uid).call();
      const NumUid = Number(tx.uid)
      const valueInEth = Web3.utils.fromWei(tx.value, 'ether')
      const reciever = tx.reciever;
      const sender = tx.sender;
      return {reciever, sender, NumUid, valueInEth};
    }
  
  }

  async function getAllTxDetails(address) {
    if (contract) {
      const txs = await contract.methods.getAllTxDetails(address).call();
      const res = txs.map(item => {
        const sender = item.sender
        const receiver = item.reciever
        const value = Web3.utils.fromWei(item.value, 'ether')
        const uid = Number(item.uid)

        return {
          sender,
          receiver,
          value,
          uid
        }
      })
      return res
    }
  
  }

  return (
    <BlockchainContext.Provider value={{ web3, contract, connectedAccount, connectMetamask, send, getTxDetails, getAllTxDetails}}>
      {children}
    </BlockchainContext.Provider>
  );
}
