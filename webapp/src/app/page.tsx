import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="container px-4 md:px-6">
                  <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                      <div className="flex flex-col justify-center space-y-4">
                          <div className="space-y-2">
                              <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none">
                                  Securely Generate Proof of Attendance
                              </h1>
                              <p className="max-w-[600px] text-gray-600 md:text-xl">
                                  Minty Proof allows you to easily create proof that you visited a location with a tap of your phone or a scan of a QR code.
                              </p>
                          </div>
                          <div className="flex flex-col gap-2 min-[400px]:flex-row">
                              <Link
                                  href="#"
                                  className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50"
                                  prefetch={false}
                              >
                                  Get Started
                              </Link>
                          </div>
                      </div>
                      <img
                          src="/placeholder.svg"
                          width="550"
                          height="310"
                          alt="Hero"
                          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                      />
                  </div>
              </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
              <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                      <div className="space-y-2">
                          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl">How Minty Proof Works</h2>
                          <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                              Minty Proof makes it easy to generate proofs by combining your wallet signature with a signature from an NFC tag.
                          </p>
                      </div>
                  </div>
                  <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                      <div className="grid gap-1">
                          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Step 1</div>
                          <h3 className="text-xl font-bold text-gray-900">Tap a NFC tag</h3>
                          <p className="text-gray-600">
                              Tap a NFC tag to the device and Minty Proof will capture the signature.
                          </p>
                      </div>
                      <div className="grid gap-1">
                          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Step 2</div>
                          <h3 className="text-xl font-bold text-gray-900">Sign with your wallet</h3>
                          <p className="text-gray-600">
                              Connect your wallet and sign the transaction to combine your signature with the NFC tag signature.
                          </p>
                      </div>
                      <div className="grid gap-1">
                          <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800">Step 3</div>
                          <h3 className="text-xl font-bold text-gray-900">Mint your Proof</h3>
                          <p className="text-gray-600">
                              Once the signatures are combined by ethereum, your minty fresh proof of attend will be minted.
                          </p>
                      </div>
                  </div>
                  <div className="flex justify-center">
                      <Link
                          href="/scan"
                          className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 disabled:pointer-events-none disabled:opacity-50"
                          prefetch={false}
                      >
                          Get Started
                      </Link>
                  </div>
              </div>
          </section>
      </main>
  );
}
