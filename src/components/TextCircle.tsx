import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import type { ComponentProps } from "react";

export default function TextCircle({ className, ...props }: ComponentProps<'div'>) {
    useGSAP(() => {
        gsap.to('.text', { rotation: 360, duration: 50, ease: 'none', repeat: -1 })
    });

    return (
        <div className={cn(className)} {...props}>
            <svg viewBox="0 0 200 200" className="w-full h-full text">
                <defs>
                    <path
                        id="circlePath"
                        d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                    />
                </defs>
                <text fill="black" fontSize="11">
                    <textPath xlinkHref="#circlePath">
                        Web Developer based in Stockholm, Sweden. Web Developer based in Stockholm, Sweden.
                    </textPath>
                </text>
            </svg>
        </div>
    )
}