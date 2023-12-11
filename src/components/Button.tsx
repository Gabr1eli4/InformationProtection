import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	disabled: boolean;
	callback: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonInterface> = ({
	children = '',
	callback,
	disabled = true,
}: ButtonInterface) => {
	return (
		<button className="button" onClick={callback} disabled={disabled}>
			{children}
		</button>
	);
};

export { Button };
