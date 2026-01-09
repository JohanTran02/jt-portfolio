'use client'

import ContactLinks from "@/components/ContactLinks";
import ContactTitle from "@/components/ContactTitle";

export default function Page() {
    return (
        <main className="relative flex h-lvh">
            <div className="flex w-full items-center justify-center">
                <ContactTitle />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <ContactLinks />
            </div>
        </main>
    )
}