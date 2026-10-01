"use client";

import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Group } from "three";

import { RubiksCubeContext, RubiksCubeContextDispatch } from "./rubiks-cube";

export default function RubiksCubeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const cubeRef = useRef<Group>(null);
  const [currentFace, setCurrentFace] = useState<number>(0);
  const value = useMemo(
    () => ({ cubeRef, currentFace }),
    [cubeRef, currentFace]
  );

  if (cubeRef.current === null) {
    cubeRef.current = new Group();
  }

  return (
    <RubiksCubeContext value={value}>
      <RubiksCubeContextDispatch value={setCurrentFace}>
        {children}
      </RubiksCubeContextDispatch>
    </RubiksCubeContext>
  );
}