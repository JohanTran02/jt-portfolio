import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Footer() {
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 2 }, });

        tl.set('.footer-animate', {
            position: 'fixed',
            right: '50%',
            bottom: '50%',
            yPercent: 50,
            xPercent: 50,
        });

        tl.to('.footer-animate', { width: '100%', })
            .to('.footer-animate', {
                yPercent: 0,
                bottom: 0,
            }, '-=25%')
            .to('.footer-animate', { width: 'auto' }, '-=30%')
    })

    return (
        <>
            <footer className="footer-animate">
                <nav className="whitespace-nowrap flex justify-between">
                    <p>Curiosity inspires how I explore code. </p>
                    <p>Passion shapes my ideas into experiences.</p>
                </nav>
            </footer>
        </>
    )
}