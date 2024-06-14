import { ScanBarcodeIcon } from "lucide-react";

export function Header() {
  return (
    <div className={"flex w-full"}>
      <div
        className={
          "p-3 bg-primary text-justify flex items-center gap-5 px-5 rounded-lg"
        }
      >
        <div>
          <ScanBarcodeIcon size={36} color={"white"} />
        </div>
        <div>
          <h1 className={"text-3xl text-white"}>code128.bar</h1>
          <h3 className={"text-sm text-white"}>Barcodes, made easy.</h3>
        </div>
      </div>
    </div>
  );
}
