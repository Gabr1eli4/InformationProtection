import { FC, TextareaHTMLAttributes } from "react";

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  value = "",
  ...rest
}) => {
  return <textarea placeholder="Output" rows={4} value={value} {...rest} />;
};

export { TextArea };
