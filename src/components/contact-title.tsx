import { Text } from "@/components/ui/Text";
import type { TextType } from "@/components/ui/Text";

import { FadeIn } from "./contact-links";

const contactTitle: TextType[] = [
  { classname: "", word: "get" },
  { classname: "indent-8", word: "in" },
  { classname: "indent-12", word: "touch" },
];

export default function ContactTitle() {
  return (
    <div className="flex flex-col text-9xl uppercase">
      {contactTitle.map((title) => (
        <FadeIn
          key={title.word}
          vars={{ duration: 1.5, ease: "power4.out", yPercent: 100 }}
        >
          <Text {...title} />
        </FadeIn>
      ))}
    </div>
  );
}