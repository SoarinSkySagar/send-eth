"use client"

import { ChakraProvider } from '@chakra-ui/react'

export function ChakraUIProvider({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>
}