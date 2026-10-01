"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useContext, useRef } from "react";

import { snapToCubeFaceColor } from "@/lib/rubiks-cube";
import { NavigationContext } from "@/rubiks-cube/navigation-context";
import {
  RubiksCubeContext,
  RubiksCubeContextDispatch,
} from "@/rubiks-cube/rubiks-cube";
import { verticalLoop } from "@/rubiks-cube/vertical-carousel";

import NavigationList from "./NavigationList";

export default function Navigation() {
  const { cubeRef } = useContext(RubiksCubeContext);
  const { previous, next, navRef } = useContext(NavigationContext);
  const setcurrentFace = useContext(RubiksCubeContextDispatch);
  const snapTween = useRef<GSAPTween | null>(null);
  const navContainer = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: navContainer });

  // oxlint-disable-next-line react/refs
  const previousItem = contextSafe(() => {
    if (snapTween.current) {
      snapTween.current.kill();
    }
    previous();
    navRef.current?.previous({ duration: 1, ease: "power1.inOut" });
  });

  // oxlint-disable-next-line react/refs
  const nextItem = contextSafe(() => {
    if (snapTween.current) {
      snapTween.current.kill();
    }
    next();
    navRef.current?.next({ duration: 1, ease: "power1.inOut" });
  });

  useGSAP(
    () => {
      snapToCubeFaceColor(cubeRef, "white");
      setcurrentFace(0);
      const navs = gsap.utils.toArray(".navigation", navContainer.current);
      if (!navs) {
        return;
      }
      const loop = verticalLoop(navs, { paused: true });

      navRef.current = loop;
    },
    { scope: navContainer }
  );

  return (
    <div
      ref={navContainer}
      className="relative flex items-center justify-center text-lg"
    >
      <button type="button" onClick={previousItem}>
        Prev
      </button>
      <NavigationList />
      <button type="button" onClick={nextItem}>
        Next
      </button>
    </div>
  );
}