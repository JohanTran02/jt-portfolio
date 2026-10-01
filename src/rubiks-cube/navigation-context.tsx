import { useContext, useRef, useCallback } from "react";
import type { ReactNode } from "react";

import type { CubeFaceColors } from "@/constants/rubiks-cube";
import { snapToCubeFaceColor, getFrontFaceColor } from "@/lib/rubiks-cube";
import type { LoopFunctions } from "@/rubiks-cube/vertical-carousel";

import {
  RubiksCubeContext,
  RubiksCubeContextDispatch,
} from "../context/rubiks-cube";

const navigationPaths: CubeFaceColors[] = [
  "white",
  "blue",
  "red",
  "yellow",
  "green",
  "orange",
];

export default function NavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { cubeRef, currentFace } = useContext(RubiksCubeContext);
  const setcurrentFace = useContext(RubiksCubeContextDispatch);
  const navRef = useRef<GSAPTimeline & LoopFunctions>(
    {} as GSAPTimeline & LoopFunctions
  );

  const previous = () => {
    const newIndex =
      (currentFace + navigationPaths.length - 1) % navigationPaths.length;
    setcurrentFace(newIndex);
    snapToCubeFaceColor(cubeRef, navigationPaths[newIndex]);
  };

  const next = () => {
    const newIndex = (currentFace + 1) % navigationPaths.length;
    setcurrentFace(newIndex);
    snapToCubeFaceColor(cubeRef, navigationPaths[newIndex]);
  };

  const getIndex = useCallback(() => {
    const color = getFrontFaceColor(cubeRef.current);
    if (color === "unknown") {
      return -1;
    }

    const colorIndex = navigationPaths.indexOf(color);

    return colorIndex;
  }, [cubeRef]);

  return (
    <NavigationContext value={{ getIndex, navRef, next, previous }}>
      {children}
    </NavigationContext>
  );
}