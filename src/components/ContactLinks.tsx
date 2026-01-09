import { useRef, type ReactNode } from "react";
import TextLink from "./ui/TextLink";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export function FadeIn({ children, className, vars }: { children: ReactNode, className?: string, vars?: GSAPTweenVars }) {
    const span = useRef<HTMLSpanElement>({} as HTMLSpanElement);
    useGSAP(() => {
        gsap.from(span.current.children, { ...vars });
    })

    return (
        <span ref={span} className={cn('overflow-hidden', className)}>{children}</span>
    )
}

export default function ContactLinks() {

    const linkedIn = process.env.USER_LINKEDIN as string;
    const gitHub = process.env.USER_GITHUB as string;

    const links = [
        { word: "Email", link: "email" },
        { word: "LinkedIn", link: linkedIn },
        { word: "GitHub", link: gitHub }
    ];

    return (
        <div className='text-xl flex flex-col'>
            <FadeIn vars={{ duration: 1.5, yPercent: 100, delay: .8, ease: 'power4.out' }}>
                <h1 className="text-2xl" >Contact</h1>
            </FadeIn>
            {
                links.map((link, index) => {
                    return (
                        <FadeIn key={`${link}-${index}`} vars={{ duration: 1.5, yPercent: 100, delay: 1.5, ease: 'power4.out' }}>
                            <TextLink  {...link} />
                        </FadeIn>
                    )
                })
            }
        </div>
    )
}
