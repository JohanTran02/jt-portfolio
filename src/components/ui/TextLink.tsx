import type { TextType } from "./Text"

type LinkType = TextType & { link: string }

export default function TextLink({ link, word }: LinkType) {
    return (
        <div>
            {link === "email" ?
                <a
                    href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;%6A%6F%68%61%6E%2E%74%72%61%6E%30%32%31%30%40%67%6D%61%69%6C%2E%63%6F%6D"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {word}
                </a>
                :
                <a href={link} rel="noopener noreferrer" target="_blank">{word}</a>
            }
        </div>
    )
}