'use client';

import ValuesAccordions from './_components/ValuesAccordions';
import AboutIntro from './_components/AboutIntro';

export default function Page() {
    return (
        <main>
            <div className="h-full flex flex-col px-24">
                <AboutIntro />
                <ValuesAccordions />
            </div>
        </main >
    )
}