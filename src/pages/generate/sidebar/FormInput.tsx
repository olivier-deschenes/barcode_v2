import React from "react";
import { Textarea } from "../../../components/ui/textarea";
import { BarcodeType, useBarcodesStore } from "../../../stores/barcodes";

export function FormInput() {
  const addBarcode = useBarcodesStore((s) => s.addBarcode);

  const [value, setValue] = React.useState("");

  const handleAddBarcode = () => {
    const lines = value.split("\n");
    const barcodes = lines.map((line) => {
      const data = line.split(":");

      const barcode: BarcodeType = {
        id: crypto.randomUUID(),
        type: "CODE_128",
        value: data[0],
        title: data.length > 1 ? data[1] : data[0],
      };

      return barcode;
    });

    console.log(barcodes);

    if (barcodes.length < 1) return;

    addBarcode(barcodes[0]);

    setValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleAddBarcode();
  };

  const hanldeKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey) return;

    switch (e.key) {
      case "Enter":
        e.preventDefault();

        handleAddBarcode();
        break;
      default:
        break;
    }
  };

  return (
    <div className={"w-full p-5"}>
      <form onSubmit={handleSubmit}>
        <Textarea
          onKeyDown={hanldeKeyDown}
          onChange={handleChange}
          placeholder={"Enter the barcodes ..."}
          value={value}
        ></Textarea>
      </form>
    </div>
  );
}
