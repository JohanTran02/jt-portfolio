"use client";

import Footer from "@/components/footer";
import RubiksCube from "@/components/RubiksCube";

export default function Home() {

	return (
		<div className="relative flex flex-col h-lvh">
			<div className="flex flex-col justify-center h-full items-center">
				<div className='text-center'>
					<p className="text-8xl">Johan Tran</p>
					<p>Full Stack developer based in Sweden</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-96" >
						<RubiksCube />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
