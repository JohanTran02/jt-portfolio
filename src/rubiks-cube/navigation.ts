import { createContext } from "react";
import type { RefObject } from "react";

import type { LoopFunctions } from "@/rubiks-cube/vertical-carousel";

interface INavigationContext {
  previous: () => void;
  next: () => void;
  getIndex: () => number;
  navRef: RefObject<GSAPTimeline & LoopFunctions>;
}

export const NavigationContext = createContext<INavigationContext>(
  {} as INavigationContext
);