'use client';

import { type ThreeEvent } from "@react-three/fiber";
import { type RefObject } from "react";
import * as THREE from 'three';
import Cubies from "./Cubies";

type RubiksCubeType = {
    cubeRef: RefObject<THREE.Group>,
    handlePointerDown: (e: ThreeEvent<PointerEvent>) => void
    handlePointerMove: (e: ThreeEvent<PointerEvent>) => void
    handlePointerEnd: (e: ThreeEvent<PointerEvent>) => void
}

export default function RubiksCube({ cubeRef, handlePointerDown, handlePointerMove, handlePointerEnd }: RubiksCubeType) {
    return (
        <group
            ref={cubeRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerEnd}
            onPointerMove={handlePointerMove}
        >
            <Cubies gap={1.1} />
        </group>
    );
}

