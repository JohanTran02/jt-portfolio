export type TextType = {
    word: string,
    classname?: string,
}

export const Text = ({ word, classname }: TextType) => {
    return (
        <div key={word} className={classname}>
            {word}
        </div>
    )
}