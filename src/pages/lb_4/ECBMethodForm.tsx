import { MouseEventHandler, useState } from "react";
import { Form, FormProps } from "../../components/Form";
import * as data from "./data";

function ECBMethodForm() {
  const [form, setForm] = useState<FormProps>({
    key: "",
    input: "",
    textArea: "",
  });

  const eExtension = (right: Uint8Array) => {
    const result: Uint8Array = new Uint8Array(new ArrayBuffer(48));

    data.eTable.forEach((item, index) => {
      if (Array.isArray(item)) {
        item.forEach((item) => (result[item] = right[index]));
      } else {
        result[item] = right[index];
      }
    });
    return result;
  };

  const permutation = (
    str: Uint8Array,
    arr: number[],
    n: number,
  ): Uint8Array => {
    const buffer = new ArrayBuffer(64);
    const result: Uint8Array = new Uint8Array(buffer);
    for (let i = 0; i < n; i++) {
      result[i] = str[arr[i - 1]];
    }
    return result;
  };

  const getBitBlock = (input: string[], buffer: ArrayBuffer): Uint8Array => {
    let block = input
      .map((item) => item.codePointAt(0)?.toString(2).padStart(8, "0"))
      .join("");

    let view = new Uint8Array(buffer);

    for (let i = 0; i < block.length; i++) {
      view[i] = Number(block[i]);
    }

    return view;
  };

  const shift = (block: Uint8Array, nth_shift: number) => {
    let result = new Uint8Array(new ArrayBuffer(28));

    for (let i = 0; i < block.length; i++) {
      result[i] = block[(i + nth_shift) % block.length];
    }

    for (let i = 0; i < block.length; i++) {
      block[i] = result[i];
    }

    return block;
  };

  const generateKeys = (key: string) => {
    let buffer = new ArrayBuffer(64);
    let blockOfKey = getBitBlock(key.split(""), buffer);

    blockOfKey = permutation(blockOfKey, data.dunno, 56);
    let left = blockOfKey.slice(0, 28);
    let right = blockOfKey.slice(28, 56);
    const result = new Array(new Uint8Array(48));

    for (let i = 0; i < 16; i++) {
      left = shift(left, data.LSTable[i]);
      right = shift(right, data.LSTable[i]);
      let mergedKey = new Uint8Array([...left, ...right]);
      let round_key = permutation(mergedKey, data.keyComp, 48);

      result.push(round_key);
    }
    return result;
  };

  const gamming = (block: Uint8Array, key: Uint8Array) => {
    return block.map((item, index) => item ^ key[index]);
  };

  const encrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    let key = form?.key;
    let keys = generateKeys(key);
    const input = form?.input;
    const paddedInput = input.padEnd(Math.ceil(input.length / 8) * 8, " ");
    const bufferInput = new ArrayBuffer(64);

    for (let i = 0; i < paddedInput.length / 8; i++) {
      let blockOfCode = paddedInput.substring(i * 8, (i + 1) * 8).split("");
      let blockOfInput = getBitBlock(blockOfCode, bufferInput);

      const right = blockOfInput.slice(0, 32);
      const left = blockOfInput.slice(32, 64);
      for (let i = 0; i < 16; i++) {
        const extension = eExtension(right);
        const gamma = gamming(extension, keys[i]);

        const sBox = new Array(8);
        for (let j = 0; j < 8; j++) {
          let row = parseInt([gamma[j * 6], gamma[j * 6 + 5]].join(""), 2);
          let col = parseInt(gamma.slice(j * 6 + 1, j * 6 + 4).join(""), 2);
          let value = data.sBlockTable[j][row][col]
            .toString(2)
            .padStart(4, "0");
        }
      }
    }
  };

  const decrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  return (
    <Form encrypt={encrypt} decrypt={decrypt} form={form} setForm={setForm} />
  );
}

export { ECBMethodForm };
