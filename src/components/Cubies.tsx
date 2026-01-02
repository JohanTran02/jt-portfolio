'use client';

type CubieProps = {
    position: [number, number, number]; // XYZ coordinates of cubie center
    materials: string[];                 // array of colors for each face of cubie
};

function getCubieMaterials(x: number, y: number, z: number): string[] {
    return [
        x === 1 ? "white" : "black",
        x === -1 ? "yellow" : "black",
        y === 1 ? "red" : "black",
        y === -1 ? "orange" : "black",
        z === 1 ? "blue" : "black",
        z === -1 ? "green" : "black",
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

export default function Cubies({ gap = 1.1 }: { gap: number }) {
    const cubies = [];

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

    return cubies;
}