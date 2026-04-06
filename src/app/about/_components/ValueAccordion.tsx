'use client'

import type { TitleData } from "../_constants/data";

export default function ValueAccordion({ title, values, index }: TitleData & { index: number }) {
    return (
        <div className="text-xl/relaxed accordion bg-white">
            <div className="flex gap-12">
                <h1 className="title text-5xl py-4">{title}</h1>
            </div>
            <div className="body overflow-hidden h-[80vh]">
                <ul className="list-inside text-2xl content">
                    {values.map((value, index) => {
                        const text = value.includes('memorize') ?
                            <>Learn how to <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://staff.ki.se/education-support/pedagogical-policy-educational-design/cognitive-load-and-learning"
                                className="underline"> memorize
                            </a> effectively
                            </> : value;
                        return <li key={`${title}-${value[0]}-${index}`}>{text}</li>;
                    })}
                </ul>
            </div>
        </div>
    )
}