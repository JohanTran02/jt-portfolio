import { type TextType, Text } from "@/components/ui/Text";
import { FadeIn } from "./ContactLinks";

export default function ContactTitle() {
    const contactTitle: TextType[] = [
        { word: "get", classname: "" },
        { word: "in", classname: "indent-8" },
        { word: "touch", classname: "indent-12" }
    ];

    return (
        <div className="uppercase text-9xl flex flex-col">
            {
                contactTitle.map((title, index) => {
                    return (
                        <FadeIn key={`${title}-${index}`} vars={{ duration: 1.5, yPercent: 100, ease: 'power4.out' }}>
                            <Text  {...title} />
                        </FadeIn>
                    )
                })
            }
        </div>
    )
}