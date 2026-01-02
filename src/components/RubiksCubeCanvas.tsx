'use client';

import { Canvas, type ThreeEvent } from "@react-three/fiber";
import RubiksCube from "./RubiksCube";
import { useContext, useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import gsap from "gsap";
import * as THREE from 'three'
import { RubiksCubeContext, RubiksCubeContextDispatch } from "@/context/RubiksCubeContext";
import { NavigationContext } from "@/context/NavigationContext";
import type { LoopFunctions } from "@/lib/verticalCarousel";

type CubeFaces = {
    color: CubeFaceColors;
    vector3: THREE.Vector3;
};

export type CubeFaceColors = 'white' | 'yellow' | 'red' | 'orange' | 'blue' | 'green';

export const cubeFaces: CubeFaces[] = [
    { color: "white", vector3: new THREE.Vector3(1, 0, 0) },   // right
    { color: "yellow", vector3: new THREE.Vector3(-1, 0, 0) }, // left
    { color: "red", vector3: new THREE.Vector3(0, 1, 0) },     // top
    { color: "orange", vector3: new THREE.Vector3(0, -1, 0) }, // bottom
    { color: "blue", vector3: new THREE.Vector3(0, 0, 1) },    // front
    { color: "green", vector3: new THREE.Vector3(0, 0, -1) },  // back
];

export function getFrontFaceColor(cube: THREE.Group): CubeFaceColors | 'unknown' {
    const forward = new THREE.Vector3(0, 0, 1);
    const tempVector3 = new THREE.Vector3();

    for (let i = 0; i < cubeFaces.length; i++) {
        const transformed = cubeFaces[i].vector3
            .clone()
            .applyQuaternion(cube.quaternion);

        const roundedX = Math.round(transformed.x);
        const roundedY = Math.round(transformed.y);
        const roundedZ = Math.round(transformed.z);

        tempVector3.set(roundedX, roundedY, roundedZ);

        if (tempVector3.equals(forward)) {
            return cubeFaces[i].color;
        }
    }

    return 'unknown';
}

export const snapToCubeFaceColor = (cubeRef: RefObject<THREE.Group>, cubeFaceColor: CubeFaceColors) => {
    const tweenTarget = { t: 0 };
    const targetQuat = new THREE.Quaternion();
    const color = cubeFaces.find(({ color }) => color === cubeFaceColor) as CubeFaces;
    const forward = new THREE.Vector3(0, 0, 1);

    targetQuat.setFromUnitVectors(color.vector3, forward);

    gsap.to(tweenTarget, {
        t: 1,
        duration: 1.5,
        ease: "power4.inOut",
        onUpdate() {
            cubeRef.current.quaternion.slerpQuaternions(
                cubeRef.current.quaternion,
                targetQuat,
                tweenTarget.t
            );
        },
    });
}

/**
 * Calculates the closest 90 degree angle
 * @param angle 
 * @returns 
 */
const snap = (angle: number) => Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);

const snapCubeFace = (
    cubeRef: RefObject<THREE.Group>,
    snapTween: RefObject<GSAPTween | null>,
    navRef: RefObject<GSAPTimeline & LoopFunctions>,
    getIndex: () => number,
    setcurrentFace: Dispatch<SetStateAction<number>>) => {
    const tweenTarget = { t: 0 };
    const tempEuler = new THREE.Euler();
    const targetQuat = new THREE.Quaternion();
    const colorIndex = getIndex();

    // Snap rotation
    tempEuler.setFromQuaternion(cubeRef.current.quaternion);
    tempEuler.x = snap(tempEuler.x);
    tempEuler.y = snap(tempEuler.y);
    tempEuler.z = snap(tempEuler.z);

    targetQuat.setFromEuler(tempEuler);

    snapTween.current = gsap.to(tweenTarget, {
        t: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete() {
            navRef.current.toIndex(colorIndex, { duration: 1.5, ease: "power1.inOut" });
            setcurrentFace(colorIndex);
        },
        onUpdate() {
            cubeRef.current.quaternion.slerpQuaternions(
                cubeRef.current.quaternion,
                targetQuat,
                tweenTarget.t
            );
        },
    });
}

export default function RubiksCubeCanvas() {
    const { cubeRef } = useContext(RubiksCubeContext);
    const setcurrentFace = useContext(RubiksCubeContextDispatch);
    const { navRef, getIndex } = useContext(NavigationContext);
    const isDragging = useRef(false);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const snapTween = useRef<GSAPTween | null>(null);

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        if (snapTween.current) snapTween.current.kill();
        if (navRef.current) navRef.current.kill();

        isDragging.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerEnd = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        isDragging.current = false;
        lastPos.current = null;

        if (!cubeRef.current || !navRef.current) return;

        snapCubeFace(cubeRef, snapTween, navRef, getIndex, setcurrentFace);
    }

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (!isDragging.current || !cubeRef.current || !lastPos.current) return;

        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;

        const sensitivity = 0.01;

        // Rotate relative to cube’s local orientation
        cubeRef.current.rotateOnWorldAxis(xAxis, dy * sensitivity);
        cubeRef.current.rotateOnWorldAxis(yAxis, dx * sensitivity);

        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    return (
        <>
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}
                onPointerLeave={(e) => {
                    if (!isDragging.current) return;
                    handlePointerEnd(e as unknown as ThreeEvent<PointerEvent>)
                }
                }        >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <RubiksCube
                    cubeRef={cubeRef}
                    handlePointerDown={handlePointerDown}
                    handlePointerEnd={handlePointerEnd}
                    handlePointerMove={handlePointerMove}
                />
            </Canvas>
        </>
    )
}