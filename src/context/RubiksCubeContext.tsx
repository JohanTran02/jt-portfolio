'use client';

import { createContext, useRef, useState, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from "react";
import * as THREE from 'three'


type RubiksCubeContextType = {
    cubeRef: RefObject<THREE.Group>,
    currentFace: number,
}

export const RubiksCubeContext = createContext<RubiksCubeContextType>({} as RubiksCubeContextType);
export const RubiksCubeContextDispatch = createContext<Dispatch<SetStateAction<number>>>({} as Dispatch<SetStateAction<number>>);

export default function RubiksCubeProvider({ children }: { children: ReactNode }) {
    const cubeRef = useRef<THREE.Group>(new THREE.Group());
    const [currentFace, setCurrentFace] = useState<number>(0);

    return (
        <RubiksCubeContext value={{ cubeRef, currentFace }}>
            <RubiksCubeContextDispatch value={setCurrentFace}>
                {children}
            </RubiksCubeContextDispatch>
        </RubiksCubeContext>
    )
}