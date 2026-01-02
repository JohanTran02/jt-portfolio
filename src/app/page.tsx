"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/Navigation";
import RubiksCubeCanvas from "@/components/RubiksCubeCanvas";
import NavigationProvider from "@/context/NavigationContext";
import RubiksCubeProvider from "@/context/RubiksCubeContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Home() {

	return (
		<div className="relative flex flex-col h-lvh">
			<div className="flex flex-col justify-center h-full items-center">
				<div className='text-center'>
					<p className="text-8xl">Johan Tran</p>
					<p>Full Stack developer based in Sweden</p>
				</div>
				<RubiksCubeProvider>
					<NavigationProvider>
						<div className="flex items-center gap-2">
							<div className="size-96" >
								<RubiksCubeCanvas />
							</div>
						</div>
						<Navigation />
					</NavigationProvider>
				</RubiksCubeProvider>
			</div>
			<Footer />
		</div>
	);
}
