"use client"

import { useWeb3 } from "@/context/Web3Context";
import { useState, useEffect } from "react";

export default function Home() {
  const { connectedAccount, send} = useWeb3();
  const [uid, setUid] = useState(0)

  const sendEth = async () => {
    const tx = await send('0x9CA9c5303bf6eCF5CaafEfa9BF19EF03c0a90c1c', 0.01);
    console.log("amount:", tx.amount)
    console.log("receiver:", tx._receiver)
    console.log("sender:", tx._sender)
    console.log("uid:", tx.uid)
  }

  return (
    <>
      <button onClick={sendEth}>
        Send
      </button>
    </>
  )
}