'use client';

import { Canvas, type ThreeEvent } from "@react-three/fiber";
import RubiksCube from "./RubiksCube";
import { useRef, type RefObject } from "react";
import gsap from "gsap";
import * as THREE from 'three'
import { useGSAP } from "@gsap/react";

/**
 * Calculates the closest 90 degree angle
 * @param angle 
 * @returns 
 */
const snap = (angle: number) => Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);

const snapCubeFace = (cubeRef: RefObject<THREE.Group>, snapTween: RefObject<GSAPTween | null>) => {
    const tweenTarget = { t: 0 };
    const tempEuler = new THREE.Euler();
    const targetQuat = new THREE.Quaternion();

    // Snap rotation
    tempEuler.setFromQuaternion(cubeRef.current.quaternion);
    tempEuler.x = snap(tempEuler.x);
    tempEuler.y = snap(tempEuler.y);
    tempEuler.z = snap(tempEuler.z);

    targetQuat.setFromEuler(tempEuler);

    tweenTarget.t = 0; // reset

    snapTween.current = gsap.to(tweenTarget, {
        t: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function (this: GSAPTween) {
            cubeRef.current.quaternion.slerpQuaternions(cubeRef.current.quaternion, targetQuat, tweenTarget.t);
        }
    });
}

export default function RubiksCubeCanvas() {
    const cubeRef = useRef<THREE.Group>(new THREE.Group());
    const isDragging = useRef(false);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const snapTween = useRef<GSAPTween | null>(null);

    const { contextSafe } = useGSAP();

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        if (snapTween.current) snapTween.current.kill();

        isDragging.current = true;
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerEnd = contextSafe((e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        isDragging.current = false;
        lastPos.current = null;

        if (!cubeRef.current) return;

        snapCubeFace(cubeRef, snapTween);
    });

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
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}
            onPointerLeave={(e) => {
                if (!isDragging.current) return;
                handlePointerEnd(e as unknown as ThreeEvent<PointerEvent>)
            }
            }        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <RubiksCube cubeRef={cubeRef} handlePointerDown={handlePointerDown} handlePointerEnd={handlePointerEnd} handlePointerMove={handlePointerMove} />
        </Canvas>
    )
}