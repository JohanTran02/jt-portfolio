import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Footer() {
  useGSAP(() => {
    const footerSelector = ".footer-animate";
    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "power4.inOut" },
    });

    tl.set(footerSelector, {
      bottom: "50%",
      position: "fixed",
      right: "50%",
      xPercent: 50,
      yPercent: 50,
    });

    tl.to(footerSelector, { width: "100%" })
      .to(
        footerSelector,
        {
          bottom: 0,
          yPercent: 0,
        },
        "-=25%"
      )
      .to(footerSelector, { width: "auto" }, "-=30%");
  });

  return (
    <footer className="footer-animate">
      <nav className="flex justify-between whitespace-nowrap">
        <p>Curiosity inspires how I explore code. </p>
        <p>Passion shapes my ideas into experiences.</p>
      </nav>
    </footer>
  );
}