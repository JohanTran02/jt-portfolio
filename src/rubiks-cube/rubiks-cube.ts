import { createContext } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import type { Group } from "three";
import { Vector3, Quaternion } from "three";

import type { CubeFaceColors, ICubeFaces } from "@/constants/rubiks-cube";
import { cubeFaces } from "@/constants/rubiks-cube";

export function getFrontFaceColor(cube: Group): CubeFaceColors | "unknown" {
  const forward = new Vector3(0, 0, 1);
  const tempVector3 = new Vector3();

  for (const cubeColor of cubeFaces) {
    const transformed = cubeColor.vector3
      .clone()
      .applyQuaternion(cube.quaternion);

    const roundedX = Math.round(transformed.x);
    const roundedY = Math.round(transformed.y);
    const roundedZ = Math.round(transformed.z);

    tempVector3.set(roundedX, roundedY, roundedZ);

    if (tempVector3.equals(forward)) {
      return cubeColor.color;
    }
  }

  return "unknown";
}

export const snapToCubeFaceColor = (
  cubeRef: RefObject<Group>,
  cubeFaceColor: CubeFaceColors
) => {
  const tweenTarget = { t: 0 };
  const targetQuat = new Quaternion();
  const forward = new Vector3(0, 0, 1);

  targetQuat.setFromUnitVectors(
    (cubeFaces.find(({ color }) => color === cubeFaceColor) as ICubeFaces)
      .vector3,
    forward
  );

  gsap.to(tweenTarget, {
    duration: 1.5,
    ease: "power4.inOut",
    onUpdate() {
      cubeRef.current.quaternion.slerpQuaternions(
        cubeRef.current.quaternion,
        targetQuat,
        tweenTarget.t
      );
    },
    t: 1,
  });
};


interface IRubiksCubeContext {
  cubeRef: RefObject<Group | null>;
  currentFace: number;
}

export const RubiksCubeContext = createContext<IRubiksCubeContext>(
  {} as IRubiksCubeContext
);
export const RubiksCubeContextDispatch = createContext<
  Dispatch<SetStateAction<number>>
>({} as Dispatch<SetStateAction<number>>);