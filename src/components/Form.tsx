import { Input } from "./Input";
import { TextArea } from "./TextArea";
import { Button } from "./Button";
import { MouseEventHandler, SetStateAction, useEffect, useState } from "react";

export interface FormProps {
	key: string;
	input: string;
	textArea: string;
}

interface FormFunctionProps {
	decrypt: MouseEventHandler<HTMLButtonElement>;
	encrypt: MouseEventHandler<HTMLButtonElement>;
	form: FormProps;
	setForm: React.Dispatch<SetStateAction<FormProps>>;
	setJsonData?: React.Dispatch<SetStateAction<FormProps | null>>;
	keyValidate?: (string: string) => boolean;
	inputValidate?: (string: string) => boolean;
}

function Form({
	decrypt,
	encrypt,
	form,
	setForm,
	setJsonData,
	keyValidate = () => true,
	inputValidate = () => true,
}: FormFunctionProps) {
	const [isInputValid, setIsInputValid] = useState<boolean>(true);
	const [isKeyValid, setIsKeyValid] = useState<boolean>(true);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (setJsonData) {
			const file = event.target.files?.[0];

			if (file) {
				const reader = new FileReader();

				reader.onload = (e) => {
					try {
						const json = JSON.parse(e.target?.result as string);
						setJsonData(json);
					} catch (error) {
						console.error("Ошибка парсинга JSON:", error);
						setJsonData(null);
					}
				};

				reader.readAsText(file);
			} else {
				setJsonData(null);
			}
		}
	};

	useEffect(() => {
		setIsInputValid(inputValidate(form.input));
		setIsKeyValid(keyValidate(form.key));
	}, [form.input, form.key, inputValidate, keyValidate]);

	return (
		<form className="form">
			<div className="input__section">
				<Input
					type="text"
					placeholder="Input"
					value={form.input}
					onChange={(event) =>
						setForm((prev) => ({
							...prev,
							input: event.target.value,
						}))
					}
				/>
				{!isInputValid && (
					<span className="error-message">Недопустимый ввод</span>
				)}
				<Input
					type="text"
					placeholder="Key"
					value={form.key}
					onChange={(event) =>
						setForm((prev) => ({
							...prev,
							key: event.target.value,
						}))
					}
				/>
				{!isKeyValid && (
					<span className="error-message">Недопустимый ввод</span>
				)}
			</div>
			<TextArea
				value={form.textArea}
				onChange={(event) =>
					setForm((prev) => ({
						...prev,
						textArea: event.target.value,
					}))
				}
			/>
			<div className="button__section">
				<Button
					key={1}
					callback={encrypt}
					disabled={!isInputValid && !isKeyValid}
				>
					Зашифровать
				</Button>
				<input type="file" key={2} onChange={handleFileChange}></input>
				<Button
					key={3}
					callback={decrypt}
					disabled={!isInputValid && !isKeyValid}
				>
					Расшифровать
				</Button>
			</div>
		</form>
	);
}

export { Form };
