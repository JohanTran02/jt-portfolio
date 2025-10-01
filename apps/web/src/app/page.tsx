"use client";

import Footer from "@/components/footer";

export default function Home() {
	return (
		<div className="flex flex-col h-lvh">
			<div className="flex flex-col justify-center h-full items-center px-5">
				<div className='text-center'>
					<p className="text-8xl">Johan Tran</p>
					<p>Full Stack developer based in Sweden</p>
				</div>
				<div className="flex items-center gap-2">
					<p>Curiosity</p>
					<div className="size-96 bg-green-300 relative" >
						<div className='absolute top-0 right-1/2 border-2 h-full border-black'></div>
						<div className='absolute top-1/2 right-0 border-2 w-full border-black'></div>
					</div>
					<p>Passion</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}
