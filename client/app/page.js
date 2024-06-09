"use client"

import { useWeb3 } from "@/context/Web3Context";
import { useState, useEffect } from "react";

export default function Home() {
  const { connectedAccount, connectMetamask, send, getTxDetails, getAllTxDetails} = useWeb3();
  const [uid, setUid] = useState(0)

  const sendEth = async () => {
    const tx = await send('0x9CA9c5303bf6eCF5CaafEfa9BF19EF03c0a90c1c', 0.01);
    console.log('Transaction:', tx);
  }

  const getAllTx = async () => {
    const txs = await getAllTxDetails('0x9CA9c5303bf6eCF5CaafEfa9BF19EF03c0a90c1c');
    console.log('All transactions:', txs);
  
  }

  const searchTx = async () => {
    const tx = await getTxDetails(2985265n);
    console.log('Transaction details:', tx)
  
  }

  return (
    <>
      <button onClick={sendEth}>
        Send
      </button>
      <br/>
      <button onClick={getAllTx}>
        Get All Transactions
      </button>
      <br/>
      <button onClick={searchTx}>
        Get Transaction Details
      </button>
    </>
  )
}