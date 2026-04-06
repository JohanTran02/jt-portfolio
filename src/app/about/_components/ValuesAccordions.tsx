'use client'
import { useGSAP } from "@gsap/react"
import ValueAccordion from "./ValueAccordion";
import { insights } from "../_constants/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default function ValuesAccordions() {
    useGSAP(() => {
        const list = gsap.utils.toArray('.accordion') as HTMLDivElement[];

        list.forEach((item, index) => {
            const content = item.querySelector('.body') as HTMLUListElement;
            const title = item.querySelector('.title') as HTMLHeadingElement;
            const start = `top 25%+=${title.clientHeight * index}px`;
            const end = `top 25%+=${title.clientHeight * list.length}px`;
            gsap.to(content, {
                ease: 'none',
                scrollTrigger: {
                    trigger: item,
                    endTrigger: '.final',
                    pinSpacing: false,
                    pin: true,
                    start: start,
                    end: end,
                    scrub: true,
                    markers: true,
                    id: (index + 1).toString()
                }
            })
        })
    })

    return (
        <div>
            <h1 className="text-7xl">Values /</h1>
            <div className="accordions p-24">
                {
                    insights.map((title, index) => (
                        <ValueAccordion key={`${title.title}-${index}`} {...title} index={index} />
                    ))
                }
                <div className="final"></div>
            </div>
        </div>
    )
}