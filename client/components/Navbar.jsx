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
    useDisclosure
} from '@chakra-ui/react'
import TxDetails from "./TxDetails";

export default function Navbar() {
    const { connectedAccount, connectMetamask, getTxDetails, getAllTxDetails } = useWeb3();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [account, setAccount] = useState(null)
    const [input, setInput] = useState('')
    const [modalContent, setModalContent] = useState(null)
    const [tx, setTx] = useState({
        sender: '',
        receiver: '',
        amount: '',
        uid: ''
    })


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
            const transaction = await getTxDetails(input)
            setTx(transaction)
            setInput('')
            setModalContent('Search Results')
            onOpen()

        }
    }

    const getAllTx = async () => {
        const txs = await getAllTxDetails(account);
        console.log(txs);
        setModalContent('Transaction History')
        onOpen()
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

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{modalContent}</ModalHeader>

            {modalContent == 'Transaction History' 
                ? 
                    <ModalBody className="mx-10">
                        <div>
                            <p>Transaction History</p>
                        </div>
                    </ModalBody>
                : 
                    <ModalBody>
                        {tx &&
                            <TxDetails sender={tx.sender} receiver={tx.reciever} amount={tx.valueInEth} uid={tx.NumUid} />    
                        }
                    </ModalBody>
            }

            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
            </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
</nav>
    
    )
}
