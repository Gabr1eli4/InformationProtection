import { useState } from "react";
import { MouseEventHandler } from "react";
import { Form } from "../../components/Form";
import { FormProps } from "../../components/Form";
import { inputValidate, keyValidate } from "./validation";

function PermutationMethodForm() {
  const [encryptTable, setEncryptTable] = useState<Array<string[]>>([]);
  const [form, setForm] = useState<FormProps>({
    key: "",
    input: "",
    textArea: "",
  });

  const size = 15;

  const parseString = (key: string) => {
    let result: Array<string[]> = [];
    key = key.replace(/ /g, "");

    let input = key.split(",");
    let inputLength = input.length;
    if (inputLength > 15 || inputLength < 15) return;
    input.forEach((item) => {
      let keyValue = item.split("|");
      result.push(keyValue);
    });

    setEncryptTable(result);
  };

  const complementInput = (input: string) => {
    let len = input.length;
    let complement = Math.ceil(len / size) * size - len;
    if (len % size != 0) {
      for (let i = 0; i < complement; i++) input += "_";
    }
    return input;
  };

  const encrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    let result: string = "";
    parseString(form.key);
    let input = complementInput(form.input);
    const inputLength = input.length;

    for (let i = 0; i < Math.ceil(inputLength / size); i++) {
      let temp = input.slice(i * size, i * size + size);
      let encStr: string[] = [];
      for (let j = 0; j < temp.length; j++) {
        let index = +encryptTable[j][1] - 1;
        encStr[index] = temp[j];
      }
      result += encStr.join("");
    }

    setForm((prev) => ({ ...prev, input: input, textArea: result }));
  };

  const decrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    let result: string = "";
    const inputLength = form.input.length;

    for (let i = 0; i < Math.ceil(inputLength / size); i++) {
      let temp = form.input.slice(i * size, i * size + size);
      let decStr: string[] = [];
      for (let j = 0; j < temp.length; j++) {
        let index = +encryptTable[j][1] - 1;
        decStr[j] = temp[index];
      }
      result += decStr.join("");
    }

    setForm((prev) => ({ ...prev, textArea: result }));
  };

  return (
    <Form
      decrypt={decrypt}
      encrypt={encrypt}
      form={form}
      setForm={setForm}
      keyValidate={keyValidate}
      inputValidate={inputValidate}
    />
  );
}

export { PermutationMethodForm };
