import React from "react";
import { Textarea } from "../../../components/ui/textarea";
import { Barcode, useBarcodesStore } from "../../../stores/barcodes";

export function FormInput() {
  const addBarcode = useBarcodesStore((s) => s.addBarcode);

  const [value, setValue] = React.useState("");

  const handleAddBarcode = () => {
    const lines = value.split("\n");
    const barcodes: Barcode[] = lines.map((line) => {
      const data = line.split(":");

      return {
        id: crypto.randomUUID(),
        type: "CODE_128",
        value: data[0],
        label: data.length > 1 ? data[1] : undefined,
      };
    });

    if (barcodes.length < 1) return;

    addBarcode(barcodes[0]);
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
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea onKeyDown={hanldeKeyDown} onChange={handleChange}></Textarea>
      </form>
    </div>
  );
}
