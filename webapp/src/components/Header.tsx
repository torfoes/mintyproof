'use client'

import React from 'react';
import Link from 'next/link';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
    const { open } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount()

    return (
        <header className="flex items-center justify-between p-4 bg-background">
            <Link href="/" className="flex items-center space-x-2">
                <LeafIcon className="h-6 w-6" />
                <span className="text-xl font-bold">Minty Proof</span>
            </Link>

            {isConnected && address ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {`${address.slice(0, 6)}...${address.slice(-4)}`}
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => open({ view: 'Account' })}>
                            Account
                        </DropdownMenuItem>


                        <DropdownMenuItem>
                            <Link href="/manage">Manage</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/scan">Scan</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/tap">Tap</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/servermint">Servermint</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/deploy">Deploy</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className={'bg-blend-color black'} onSelect={() => open()}>
                            Disconnect
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button onClick={() => open()}>Connect Wallet</Button>
            )}
        </header>
    );
};

type LeafIconProps = React.SVGProps<SVGSVGElement>;

const LeafIcon: React.FC<LeafIconProps> = (props) => {    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
    )
}

export default Header;