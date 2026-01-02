import { useContext, useRef, type ReactNode, type RefObject } from "react"
import { RubiksCubeContext, RubiksCubeContextDispatch } from "./RubiksCubeContext"
import { type CubeFaceColors, getFrontFaceColor, snapToCubeFaceColor } from "@/components/RubiksCubeCanvas";
import { createContext } from "react";
import type { LoopFunctions } from "@/lib/verticalCarousel";

type NavigationContext = {
    previous: () => void,
    next: () => void,
    getIndex: () => number,
    navRef: RefObject<GSAPTimeline & LoopFunctions>;
}

export const NavigationContext = createContext<NavigationContext>({} as NavigationContext)

export default function NavigationProvider({ children }: { children: ReactNode }) {
    const { cubeRef, currentFace } = useContext(RubiksCubeContext);
    const setcurrentFace = useContext(RubiksCubeContextDispatch)
    const navRef = useRef<GSAPTimeline & LoopFunctions>({} as GSAPTimeline & LoopFunctions);
    const navigationPaths: CubeFaceColors[] = ["white", "blue", "red", "yellow", "green", "orange"];

    const previous = () => {
        const newIndex = (currentFace + navigationPaths.length - 1) % navigationPaths.length;
        setcurrentFace(newIndex);
        snapToCubeFaceColor(cubeRef, navigationPaths[newIndex]);
    }

    const next = () => {
        const newIndex = (currentFace + 1) % navigationPaths.length;
        setcurrentFace(newIndex);
        snapToCubeFaceColor(cubeRef, navigationPaths[newIndex]);
    }

    const getIndex = () => {
        const color = getFrontFaceColor(cubeRef.current);
        if (color === 'unknown') return -1;

        const colorIndex = navigationPaths.indexOf(color);

        return colorIndex;
    }

    return (
        <NavigationContext value={{ navRef, getIndex, next, previous }}>
            {children}
        </NavigationContext>
    )
}