import { ButtonHTMLAttributes, FC, MouseEventHandler } from "react";

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  callback: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonInterface> = ({
  children = "",
  callback,
}: ButtonInterface) => {
  return (
    <button className="button" onClick={callback}>
      {children}
    </button>
  );
};

export { Button };
