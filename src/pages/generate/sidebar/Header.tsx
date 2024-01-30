import { BarcodeIcon, ScanBarcodeIcon } from "lucide-react";

export function Header() {
  return (
    <div
      className={
        "rounded p-3 w-full text-justify bg-white flex items-center gap-5 px-5"
      }
    >
      <div>
        <ScanBarcodeIcon size={36} color={"black"} />
      </div>
      <div>
        <h1 className={"text-3xl text-black"}>code128.bar</h1>
        <h3 className={"text-sm text-black"}>Barcodes, made easy.</h3>
      </div>
    </div>
  );
}
