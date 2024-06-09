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
      setConnectedAccount(accounts[0]);
    } else {
      alert('Please install MetaMask and try again');
    }
  }

  async function send(receiver, valueInEth) {
    if (contract && connectedAccount) {
      const transaction = await contract.methods.send(receiver).send({ from: connectedAccount, value: Web3.utils.toWei(valueInEth, 'ether') });

      const event = transaction.events.Sent;

      if (event) {
        const { from, to, amount, uid } = event.returnValues;
        console.log('Event received:', event);
        console.log('From:', from);
        console.log('To:', to);
        console.log('Amount:', amount);
        console.log('UID:', uid);
        return { from, to, amount, uid };
      } else {
        console.log('No Sent event found in the transaction receipt');
        return null;
      }
    }
  }

  async function getTxDetails(uid) {
    if (contract) {
      const tx = await contract.methods.getTxDetails(uid).call();
      console.log('Transaction details:', tx)
      return tx;
    }
  
  }

  async function getAllTxDetails(address) {
    if (contract) {
      const txs = await contract.methods.getAllTxDetails(address).call();
      console.log('All transactions:', txs)
      return txs;
    }
  
  }

  return (
    <BlockchainContext.Provider value={{ web3, contract, connectedAccount, connectMetamask, send, getTxDetails, getAllTxDetails}}>
      {children}
    </BlockchainContext.Provider>
  );
}
