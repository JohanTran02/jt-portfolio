"use client";

import ContactLinks from "@/components/contact-links";
import ContactTitle from "@/components/contact-title";

export default function Page() {
  return (
    <main className="relative flex h-lvh">
      <div className="flex w-full items-center justify-center">
        <ContactTitle />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <ContactLinks />
      </div>
    </main>
  );
}