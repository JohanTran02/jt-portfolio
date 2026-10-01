"use client";

import { Canvas } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { gsap } from "gsap";
import { useContext, useRef } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { Vector3, Quaternion, Euler } from "three";
import type { Group } from "three";

import { NavigationContext } from "@/rubiks-cube/navigation-context";
import {
  RubiksCubeContext,
  RubiksCubeContextDispatch,
} from "@/rubiks-cube/rubiks-cube";
import type { LoopFunctions } from "@/rubiks-cube/vertical-carousel";

import RubiksCube from "./rubiks-cube";

/**
 * Calculates the closest 90 degree angle
 * @param angle Closest angle
 * @returns angle
 */
const snap = (angle: number) =>
  Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);

const snapCubeFace = (
  cubeRef: RefObject<Group>,
  snapTween: RefObject<GSAPTween | null>,
  navRef: RefObject<GSAPTimeline & LoopFunctions>,
  getIndex: () => number,
  setcurrentFace: Dispatch<SetStateAction<number>>
) => {
  const tweenTarget = { t: 0 };
  const tempEuler = new Euler();
  const targetQuat = new Quaternion();
  const colorIndex = getIndex();

  // Snap rotation
  tempEuler.setFromQuaternion(cubeRef.current.quaternion);
  tempEuler.x = snap(tempEuler.x);
  tempEuler.y = snap(tempEuler.y);
  tempEuler.z = snap(tempEuler.z);

  targetQuat.setFromEuler(tempEuler);

  snapTween.current = gsap.to(tweenTarget, {
    duration: 1.5,
    ease: "power2.inOut",
    onComplete() {
      navRef.current.toIndex(colorIndex, {
        duration: 1.5,
        ease: "power1.inOut",
      });
      setcurrentFace(colorIndex);
    },
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

export default function RubiksCubeCanvas() {
  const { cubeRef } = useContext(RubiksCubeContext);
  const setcurrentFace = useContext(RubiksCubeContextDispatch);
  const { navRef, getIndex } = useContext(NavigationContext);
  const isDragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const xAxis = new Vector3(1, 0, 0);
  const yAxis = new Vector3(0, 1, 0);
  const snapTween = useRef<GSAPTween | null>(null);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();

    if (snapTween.current) {
      snapTween.current.kill();
    }
    if (navRef.current) {
      navRef.current.kill();
    }

    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerEnd = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDragging.current = false;
    lastPos.current = null;

    if (!cubeRef.current || !navRef.current) {
      return;
    }

    snapCubeFace(cubeRef, snapTween, navRef, getIndex, setcurrentFace);
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!isDragging.current || !cubeRef.current || !lastPos.current) {
      return;
    }

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    const sensitivity = 0.01;

    // Rotate relative to cube’s local orientation
    cubeRef.current.rotateOnWorldAxis(xAxis, dy * sensitivity);
    cubeRef.current.rotateOnWorldAxis(yAxis, dx * sensitivity);

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <Canvas
      camera={{ fov: 50, position: [0, 0, 6] }}
      onPointerLeave={(e) => {
        if (!isDragging.current) {
          return;
        }
        handlePointerEnd(e as unknown as ThreeEvent<PointerEvent>);
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <RubiksCube
        cubeRef={cubeRef}
        handlePointerDown={handlePointerDown}
        handlePointerEnd={handlePointerEnd}
        handlePointerMove={handlePointerMove}
      />
    </Canvas>
  );
}