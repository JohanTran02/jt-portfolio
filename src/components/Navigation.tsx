'use client';

import { verticalLoop } from "@/lib/verticalCarousel";
import { useGSAP } from "@gsap/react";
import { useContext, useRef } from "react";
import gsap from "gsap";
import NavigationList from "./NavigationList";
import { snapToCubeFaceColor } from "./RubiksCubeCanvas";
import { RubiksCubeContext, RubiksCubeContextDispatch } from "@/context/RubiksCubeContext";
import { NavigationContext } from "@/context/NavigationContext";

export default function Navigation() {
    const { cubeRef } = useContext(RubiksCubeContext);
    const { previous, next, navRef } = useContext(NavigationContext)
    const setcurrentFace = useContext(RubiksCubeContextDispatch)
    const snapTween = useRef<GSAPTween | null>(null);
    const navContainer = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: navContainer });

    const previousItem = contextSafe(() => {
        if (snapTween.current) snapTween.current.kill();
        previous();
        navRef.current?.previous({ duration: 1, ease: "power1.inOut" })
    })

    const nextItem = contextSafe(() => {
        if (snapTween.current) snapTween.current.kill();
        next();
        navRef.current?.next({ duration: 1, ease: "power1.inOut" })
    })

    useGSAP(((_, contextSafe) => {
        snapToCubeFaceColor(cubeRef, "white");
        setcurrentFace(0);
        const navs = gsap.utils.toArray(".navigation", navContainer.current) as HTMLDivElement[];
        if (!navs) return;

        if (!contextSafe) return;

        const loop = verticalLoop(navs, { paused: true });

        navRef.current = loop;

    }), { scope: navContainer })

    return (
        <div ref={navContainer} className="text-lg relative flex justify-center items-center">
            <button onClick={previousItem}>Prev</button>
            <NavigationList />
            <button onClick={nextItem}>Next</button>
        </div >
    )
}