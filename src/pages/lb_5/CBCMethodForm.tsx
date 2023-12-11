import { MouseEventHandler, useState } from "react";
import { Form, FormProps } from "../../components/Form";
import * as data from "../helpers/data";

function CBCMethodForm() {
  const [form, setForm] = useState<FormProps>({
    key: "",
    input: "",
    textArea: "",
  });

  const pseudoRandomSequence = [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0];

  const permutation = (str: Uint8Array, arr: number[]): Uint8Array => {
    return new Uint8Array(arr.map(item => str[item - 1]));
  }

  const getBitBlock = (input: string[]): Uint8Array => {
    return new Uint8Array(input.map(item => item.codePointAt(0)?.toString(2).padStart(8, "0")).join("").split("").map(item => +item));
  }

  const shift = (block: Uint8Array, nth_shift: number) => {
    return new Uint8Array([...block.slice(nth_shift), ...block.slice(0, nth_shift)])
  }

  const generateKeys = (key: string) => {
    let blockOfKey = getBitBlock(key.split(""));

    blockOfKey = permutation(blockOfKey, data.dunno);
    let left = blockOfKey.slice(0, 28);
    let right = blockOfKey.slice(28);
    const result: Array<Uint8Array> = [];

    for (let i = 0; i < 16; i++) {
      left = shift(left, data.LSTable[i]);
      right = shift(right, data.LSTable[i]);
      const mergedKey = new Uint8Array([...left, ...right]);
      const round_key = permutation(mergedKey, data.keyComp);

      result.push(round_key);
    }
    return result;
  };

  const gamming = (block: Uint8Array, key: Uint8Array) => {
    return block.map((item, index) => item ^ key[index]);
  };

  const binToDec = (arr: string, size: number) => {
    const result = [];
    for (let i = 0; i < arr.length / size; i++) {
      const block = arr.slice((i * size), (i * size) + size);
      const char = parseInt(block, 2);
      result.push(String.fromCharCode(char));
    }
    return result;
  }

  const sBoxCalc = (block: Uint8Array): Uint8Array => {
    const sBox = new Array(8);
    for (let i = 0; i < 8; i++) {
      const row = parseInt([block[i * 6], block[i * 6 + 5]].join(""), 2);
      const col = parseInt(block.slice(i * 6 + 1, i * 6 + 5).join(""), 2);
      const value = data.sBlockTable[i][row][col].toString(2).padStart(4, '0');

      sBox[i] = value.split('').map(item => +item);
    }

    return Uint8Array.from(sBox.reduce((a, b) => [...a, ...b], []));
  }

  const encrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const key = form?.key;
    const keys = generateKeys(key);
    let bruh = new Uint8Array(pseudoRandomSequence);

    const input = form?.input;
    const paddedInput = input.padEnd(Math.ceil(input.length / 8) * 8, " ");

    let result = "";
    for (let i = 0; i < paddedInput.length / 8; i++) {
      const blockOfCode = paddedInput.slice(i * 8, (i + 1) * 8).split("");
      let blockOfInput = getBitBlock(blockOfCode);

      blockOfInput = gamming(blockOfInput, bruh);

      blockOfInput = permutation(blockOfInput, data.initialPermutation);

      let left = blockOfInput.slice(0, 32);
      let right = blockOfInput.slice(32);
      for (let j = 0; j < 16; j++) {
        const extension = permutation(right, data.eTable);
        const gamma = gamming(extension, keys[j]);

        const flattened = sBoxCalc(gamma);
        const block = permutation(flattened, data.pTable);
        left = gamming(left, block);

        if (j !== 15) {
          [left, right] = [right, left];
        }
      }
      const combine = new Uint8Array([...left, ...right]);
      const chiper_text = permutation(combine, data.finalPermutation);
      result += binToDec(chiper_text.join(''), 8).join("");
      bruh = chiper_text;
    }
    setForm(prev => ({...prev, textArea: result}));
  };

  const decrypt: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    
    const key = form?.key;
    const keys = generateKeys(key).reverse();
    let bruh = new Uint8Array(pseudoRandomSequence);

    const input = form?.textArea;

    let result = '';
    for (let i = 0; i < input.length / 8; i++) {
      const blockOfCode = input.slice(i * 8, (i + 1) * 8).split("");
      let blockOfInput = getBitBlock(blockOfCode);

      const encblock = blockOfInput;

      blockOfInput = permutation(blockOfInput, data.initialPermutation);

      let left = blockOfInput.slice(0, 32);
      let right = blockOfInput.slice(32);
      for (let j = 0; j < 16; j++) {
        const extension = permutation(right, data.eTable);
        const gamma = gamming(extension, keys[j]);

        const flattened = sBoxCalc(gamma);
        const block = permutation(flattened, data.pTable);
        left = gamming(left, block);

        if (j !== 15) {
          [left, right] = [right, left];
        }
      }
      const combine = new Uint8Array([...left, ...right]);
      let chiper_text = permutation(combine, data.finalPermutation);
      chiper_text = gamming(chiper_text, bruh);
      result += binToDec(chiper_text.join(''), 8).join("");
      bruh = encblock;
    }
    setForm(prev => ({ ...prev, textArea: result }))
  };

  return (
    <Form encrypt={encrypt} decrypt={decrypt} form={form} setForm={setForm} keyValidate={() => form.key.length % 8 === 0}/>
  );
}

export { CBCMethodForm };
