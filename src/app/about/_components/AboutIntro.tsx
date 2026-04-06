'use client';

import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText)

export default function AboutIntro() {
    useGSAP(() => {
        let timeline = gsap.timeline();
        const splits: HTMLElement[] = gsap.utils.toArray('.split');

        SplitText.create(".qoute", {
            type: "lines, words",
            mask: "lines",
            linesClass: "qouteLine",
            onSplit(self) {
                let animation: GSAPAnimation;
                animation = gsap.from(self.lines, {
                    duration: 0.8,
                    yPercent: -115,
                    stagger: 1,
                    delay: 1,
                    ease: "power3.out"
                });
                timeline.add(animation);
            }
        });

        splits.forEach((split) => {
            let animation: GSAPAnimation;
            SplitText.create(split, {
                type: "lines, words",
                mask: "lines",
                linesClass: "line",
                onSplit(self) {
                    animation = gsap.from(self.lines, {
                        duration: 1,
                        yPercent: -110,
                        stagger: 0.01,
                        ease: "power3.out"
                    });
                    timeline.add(animation, 3);
                }
            });
        })

    })

    return (
        <div className="h-screen grid text-xl grid-rows-3 relative py-10">
            <div className='flex flex-start'>
                <p className="text-4xl split">
                    Web Developer based in Stockholm, Sweden. <br /> Learning what web development can offer.
                </p>
            </div>
            <div className="flex flex-col justify-center items-center italic">
                <h1 className="text-5xl p-4 qoute">"Doubt is not a pleasant condition, but certainty is absurd"</h1>
                <p className="text-2xl text-center qoute">Voltaire</p>
            </div>
            <div className="flex h-full justify-end items-end">
                <ul className="text-4xl text-right split">
                    <li>Self-taught pianist</li>
                    <li>Amateur cook/baker</li>
                    <li>Avid classical listener</li>
                    <li>Love solving puzzles</li>
                    <li>Invested in psychology</li>
                </ul>
            </div>
        </div>
    )
}