"use client"

import { useWeb3 } from "@/context/Web3Context";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { connectedAccount, connectMetamask } = useWeb3();
    const [account, setAccount] = useState('Account not connected')

    useEffect(() => {
        async function getAccount() {
            if (connectedAccount) {
                setAccount(connectedAccount);
            }
        }
        getAccount();
    }, [connectedAccount])

    const connect = async () => {
        await connectMetamask()
    }

    return (
        <>
            <button onClick={connect}>
                Connect
            </button>
            <h1>{account}</h1>
        </>
    )
}