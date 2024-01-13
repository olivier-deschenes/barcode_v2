import { PagesContainer } from "./barcodes/PagesContainer";
import { Sidebar } from "./sidebar/Sidebar";

export function Generate() {
  return (
    <div
      className={
        "flex print:bg-transparent flex-1 container print:p-0 gap-8 print:gap-0 print:w-screen print:max-w-none"
      }
    >
      <Sidebar />
      <PagesContainer />
    </div>
  );
}
