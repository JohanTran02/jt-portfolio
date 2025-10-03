'use client';

import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from 'three'

type CubieProps = {
    position: [number, number, number]; // XYZ coordinates of cubie center
    materials: string[];                 // array of colors for each face of cubie
};

function getCubieMaterials(x: number, y: number, z: number): string[] {
    return [
        x === 1 ? "white" : "black",   // right face
        x === -1 ? "yellow" : "black", // left face
        y === 1 ? "red" : "black",     // top
        y === -1 ? "orange" : "black", // bottom
        z === 1 ? "blue" : "black",    // front
        z === -1 ? "green" : "black",  // back
    ];
}

function Cubie({ position, materials }: CubieProps) {
    return (
        <mesh position={position}>
            <boxGeometry args={[1, 1, 1]} />
            {materials.map((color, i) => (
                <meshBasicMaterial
                    attach={`material-${i}`}
                    key={i}
                    color={color}
                />
            ))}
        </mesh>
    );
}

type RubiksCubeProps = {
    gap?: number;
};

export default function RubiksCube({ gap = 1.1 }: RubiksCubeProps) {
    const cubies = [];

    const cubeRef = useRef<THREE.Group>(null);
    const [isDragging, setDragging] = useState(false);
    const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

    const snap = (angle: number) =>
        Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setDragging(false);
        setLastPos(null);

        if (cubeRef.current) {
            const euler = new THREE.Euler().setFromQuaternion(cubeRef.current.quaternion);

            euler.x = snap(euler.x);
            euler.y = snap(euler.y);
            euler.z = snap(euler.z);

            cubeRef.current.quaternion.setFromEuler(euler);
        }
    };

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (!isDragging || !cubeRef.current || !lastPos) return;

        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;

        const sensitivity = 0.01;

        // Rotate relative to cube’s local orientation
        cubeRef.current.rotateOnWorldAxis(
            new THREE.Vector3(1, 0, 0),
            dy * sensitivity
        );
        cubeRef.current.rotateOnWorldAxis(
            new THREE.Vector3(0, 1, 0),
            dx * sensitivity
        );

        setLastPos({ x: e.clientX, y: e.clientY });
    };

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                cubies.push(
                    <Cubie
                        key={`${x}-${y}-${z}`}
                        position={[x * gap, y * gap, z * gap]}
                        materials={getCubieMaterials(x, y, z)}
                    />
                );
            }
        }
    }

    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <group
                ref={cubeRef}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
            >
                {cubies}
            </group>
        </Canvas>
    );
}

