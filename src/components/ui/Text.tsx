export interface TextType {
  word: string;
  classname?: string;
}

export const Text = ({ word, classname }: TextType) => (
  <div key={word} className={classname}>
    {word}
  </div>
);