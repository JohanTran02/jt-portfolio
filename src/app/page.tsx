"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import Footer from "@/components/footer";
// import Navigation from "@/components/navigation";
// import RubiksCubeCanvas from "@/rubiks-cube/rubiks-cube-canvas";
// import NavigationProvider from "@/rubiks-cube/navigation-context";
// import RubiksCubeProvider from "@/rubiks-cube/rubiks-cube-context";

gsap.registerPlugin(useGSAP);

export default function Home() {
  return (
    <div className="relative flex h-lvh flex-col">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-8xl">Johan Tran</p>
          <p>Full Stack developer based in Sweden</p>
        </div>
        {/* <RubiksCubeProvider>
          <NavigationProvider>
            <div className="flex items-center gap-2">
              <div className="size-96">
                <RubiksCubeCanvas />
              </div>
            </div>
            <Navigation />
          </NavigationProvider>
        </RubiksCubeProvider> */}
      </div>
      <Footer />
    </div>
  );
}