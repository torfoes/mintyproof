'use client'

import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"


const CONTRACT_CODE = "hellow world code"

const Page = () => {

    function handleSubmit () {
        console.log("submit!");
    }

    return (

        <div className="flex h-screen p-2">
            <div className="w-1/2 p-6 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Deploy Your MintyProof</CardTitle>
                        <CardDescription>Enter your details to customize the contract</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Collection Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter collection name"
                                    //     value={name}
                                    //     onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="symbol">Symbol</Label>
                                    <Input
                                        id="symbol"
                                        placeholder="Enter symbol"
                                    //     value={symbol}
                                    //     onChange={(e) => setSymbol(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSubmit}>Deploy Contract</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="w-1/2 p-6 text-white overflow-y-auto">
                <Card className="bg-gray-200">
                    <CardHeader>
                        <CardTitle>Contract Code</CardTitle>
                    </CardHeader>
                    <CardContent>
            <pre className="text-sm overflow-x-auto">
              <code>{CONTRACT_CODE}</code>
            </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Page;