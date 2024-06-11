"use client"

import { useWeb3 } from "@/context/Web3Context";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

export default function Navbar() {
    const { connectedAccount, connectMetamask, getTxDetails, getAllTxDetails } = useWeb3();

    const [account, setAccount] = useState(null)
    const [input, setInput] = useState('')


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

    const shortAddress = (string) => {
        return `${string.slice(0, 5)}.....${string.slice(-5)}`
    }

    const handleSearch = async (event) => {
        event.preventDefault(); 
        if (input) {
            const tx = await getTxDetails(input)
            setInput('')
        }
    }

    const getAllTx = async () => {
        const txs = await getAllTxDetails(account);
        console.log(txs);
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="#" className="text-white text-lg font-semibold">Send ETH</a>
                
                <div className="flex-1 mx-4">
                {account && <form className="relative" onSubmit={handleSearch} >
                    <input 
                        type="number" 
                        placeholder="Search for a transaction UID..." 
                        className="w-full py-2 pl-4 pr-10 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-2 mr-2 text-gray-400 hover:text-white" onClick={handleSearch} >
                        <FaSearch className="mt-1" />
                    </button>
                </form>}
                </div>
        {account  && <Button colorScheme='blue' onClick={getAllTx} className="mr-2" >History</Button>}
        {account 
            ? 
                <Button colorScheme='blue'>
                    {shortAddress(account)}
                </Button>
            : 
                <Button colorScheme='blue' onClick={connect}>
                    Connect Wallet
                </Button>
        }
  </div>
</nav>
    
    )
}
