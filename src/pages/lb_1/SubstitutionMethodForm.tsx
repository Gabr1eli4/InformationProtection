import { MouseEventHandler, useState } from "react";
import { Form } from "../../components/Form";
import { FormProps } from "../../components/Form";
import { validate } from "./Validation";

function SubstitutionMethodForm() {
  const [form, setForm] = useState<FormProps>({
    key: "",
    input: "",
    textArea: "",
  });
  const [jsonData, setJsonData] = useState<any>(null);
  const [encryptTable, setEncryptTable] = useState<any>(null);
  const [decryptTable, setDecryptTable] = useState<any>(null);

  const size = 5;

  const generateBinarySequences = (length: number): string[] => {
    const sequences: string[] = [];
    const maxDecimalValue = Math.pow(2, length);

    for (let i = 0; i < maxDecimalValue; i++) {
      const binarySequence = i.toString(2).padStart(length, "0");
      sequences.push(binarySequence);
    }

    return sequences;
  };

  const parseString = (key: string): string[] => {
    let result: string[] = [];
    let arrLength = key.length;

    for (let i = 0; i < Math.ceil(arrLength / size); i++) {
      result.push(key.slice(i * size, i * size + size));
    }

    return result;
  };

  const generateEncryptTable = (key: string) => {
    const seq = generateBinarySequences(5);

    const table: { [key: string]: string } = {};
    const keys = parseString(key);

    keys.forEach((item, index) => {
      table[seq[index]] = item;
    });

    return table;
  };

  const swap = (table: { [key: string]: string }) => {
    const result: { [key: string]: string } = {};

    Object.entries(table).forEach(([key, value]) => {
      result[value] = key;
    });

    return result;
  };

  const encrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const input = parseString(form.input);

    if (!jsonData) {
      setEncryptTable(generateEncryptTable(form.key));
      setDecryptTable(swap(encryptTable));
      const result = input
        .map((item) => encryptTable[item.toLowerCase()])
        .join("");

      setForm((prev) => ({ ...prev, textArea: result }));
      return;
    }

    setDecryptTable(swap(jsonData));
    const result = input
      .map((item) => {
        return jsonData[item.toLowerCase()];
      })
      .join("");

    setForm((prev) => ({ ...prev, textArea: result }));
  };

  const decrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (form.input.length != 0) {
      const input = parseString(form.input);
      let result = input
        .map((item) => decryptTable[item.toLowerCase()])
        .join("");

      setForm((prev) => ({ ...prev, textArea: result }));
    }
  };

  return (
    <Form
      decrypt={decrypt}
      encrypt={encrypt}
      form={form}
      setForm={setForm}
      setJsonData={setJsonData}
      keyValidate={validate}
      inputValidate={validate}
    />
  );
}

export { SubstitutionMethodForm };
