import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Modal } from '@/context/web3modal'
import Header from "@/components/Header";
import { cn } from "@/lib/utils"

import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})
export const metadata: Metadata = {
    title: "Minty Proof",
    description: "Secure proof of attendance. Minty fresh proofs, security you can trust.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <Web3Modal>
            <Header/>
            {children}
        </Web3Modal>
        </body>
        </html>
    );
}