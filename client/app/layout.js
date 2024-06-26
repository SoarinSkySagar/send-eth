import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/context/Web3Context";
import Navbar from "@/components/Navbar";
import { ChakraUIProvider } from "@/context/ChakraProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraUIProvider>
          <Web3Provider>
            <Navbar/>
            {children}
          </Web3Provider>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
