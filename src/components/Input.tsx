import { FC, InputHTMLAttributes } from 'react'

interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  type: string
}

const Input: FC<InputInterface> = ({
  type,
  placeholder,
  onChange: onClick
}: InputInterface) => {
  return (
    <input
      className="input"
      placeholder={placeholder}
      type={type}
      onChange={onClick}
    />
  )
}

export { Input }
