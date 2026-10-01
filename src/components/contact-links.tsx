import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import TextLink from "./ui/TextLink";

gsap.registerPlugin(useGSAP);

export function FadeIn({
  children,
  className,
  vars,
}: {
  children: ReactNode;
  className?: string;
  vars?: GSAPTweenVars;
}) {
  const span = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    if (!span.current) {
      return;
    }

    gsap.from(span.current.children, { ...vars });
  });

  return (
    <span ref={span} className={cn("overflow-hidden", className)}>
      {children}
    </span>
  );
}

export default function ContactLinks() {
  const linkedIn = process.env.NEXT_PUBLIC_USER_LINKEDIN;
  const gitHub = process.env.NEXT_PUBLIC_USER_GITHUB;

  const links = [
    { link: "email", word: "Email" },
    ...(linkedIn !== "" && linkedIn !== undefined
      ? [{ link: linkedIn, word: "LinkedIn" }]
      : []),
    ...(gitHub !== "" && gitHub !== undefined
      ? [{ link: gitHub, word: "GitHub" }]
      : []),
  ];

  return (
    <div className="flex flex-col text-xl">
      <FadeIn
        vars={{ delay: 0.8, duration: 1.5, ease: "power4.out", yPercent: 100 }}
      >
        <h1 className="text-2xl">Contact</h1>
      </FadeIn>
      {links.map((link) => (
        <FadeIn
          key={link.word}
          vars={{
            delay: 1.5,
            duration: 1.5,
            ease: "power4.out",
            yPercent: 100,
          }}
        >
          <TextLink {...link} />
        </FadeIn>
      ))}
    </div>
  );
}