"use client"

import { useWeb3 } from "@/context/Web3Context";
import { useState, useEffect } from "react";
import { useToast } from '@chakra-ui/react'
import { FaLock } from "react-icons/fa";

export default function Home() {
  const { connectedAccount, send} = useWeb3();
  const toast = useToast()

  const [uid, setUid] = useState(0)
  const [sendTo, setSendTo] = useState('')
  const [amount, setAmount] = useState('')

  const sendEth = async (address, value) => {
    if (sendTo === '' || amount === '') {
      toast({
        title: 'Please fill all the fields!',
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
      return
    }
    const tx = await send(address, value);
    if (tx.uid != 0) {
      toast({
        title: 'Transaction Successful!',
        description: "Your transaction UID is "+tx.uid,
        status: 'success',
        duration: 10000,
        isClosable: true,
      })
    } else if (uid == 0) {
      toast({
        title: 'Transaction failed due to network errors!',
        description: "Please try again",
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    } else if (tx == null) {
      toast({
        title: 'Transaction failed due to client errors!',
        description: "Please contact developers",
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    }
  }

  const handleSubmit = async () => {
    await sendEth(sendTo, amount)
    setSendTo('')
    setAmount('')
  }

  return (
    <div className="min-h-screen bg-orange-200 flex items-center justify-center">
  <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg px-5 py-8 shadow-lg w-full max-w-md">
    {connectedAccount ? <div><h1 className="text-2xl font-bold mb-1">Transfer to:</h1>
    <input
      type="text"
      placeholder="Enter address"
      className="border border-gray-300 p-2 rounded mb-4 w-full"
      value={sendTo}
      onChange={(e) => setSendTo(e.target.value)}
    />
    <h1 className="text-2xl font-bold mb-1">Amount (in ETH):</h1>
    <input
      type="number"
      placeholder="Enter amount"
      className="border border-gray-300 p-2 rounded mb-4 w-full"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <div className="flex justify-center">
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSubmit}>
        Submit
      </button>
    </div></div> :
    <h1 className="flex items-center text-red-500 font-bold px-1">
    <FaLock className="mr-4 text-4xl" /> 
    Please connect Metamask wallet and/or switch to Sepolia network first!
  </h1>}
  </div>
</div>

  )
}