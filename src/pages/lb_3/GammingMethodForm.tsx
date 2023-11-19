import { useState, MouseEventHandler } from "react";
import { Form, FormProps } from "../../components/Form";

const GammingMethodForm = () => {
  const [a, b, c, t] = [5, 2048, 51, 13];
  const [form, setForm] = useState<FormProps>({
    key: "",
    input: "",
    textArea: "",
  });
  let prevGammaResult: number;

  function calcGamma(): number {
    if (!prevGammaResult) {
      prevGammaResult = t;
      return t;
    }
    prevGammaResult = (a * prevGammaResult + c) % b;
    return prevGammaResult;
  }

  function calcResultEncrypt(input: string): string {
    const charCode = input.charCodeAt(0);
    let gamma = calcGamma();

    const result = (charCode + gamma) % b;
    if (result >= b) return String.fromCharCode(result - b);
    return String.fromCharCode(result);
  }

  function calcResultDecrypt(input: string): string {
    const charCode = input.charCodeAt(0);
    const gamma = calcGamma();

    const result = (charCode - gamma) % b;
    if (result < 0) return String.fromCharCode(result + b);
    return String.fromCharCode(result);
  }

  const encrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const input = form.input;
    if (input) {
      let result: string = "";
      for (let i = 0; i < input.length; i++) {
        result += calcResultEncrypt(input[i]);
      }
      setForm((prev) => ({ ...prev, textArea: result }));
    }
  };

  const decrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const input = form.input;
    if (input) {
      let result: string = "";
      for (let i = 0; i < input.length; i++)
        result += calcResultDecrypt(input[i]);
      setForm((prev) => ({ ...prev, textArea: result }));
    }
  };

  return (
    <Form encrypt={encrypt} decrypt={decrypt} form={form} setForm={setForm} />
  );
};

export { GammingMethodForm };
