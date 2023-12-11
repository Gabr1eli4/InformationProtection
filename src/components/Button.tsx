import { ButtonHTMLAttributes, FC, MouseEventHandler } from "react";

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children: React.ReactNode;
  onclick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean
}

const Button: FC<ButtonInterface> = ({
  children = "",
  onclick,
  disabled = false
}: ButtonInterface) => {
  return (
    <button className="button" onClick={onclick} disabled={disabled}>
      {children}
    </button>
  );
};

export { Button };
