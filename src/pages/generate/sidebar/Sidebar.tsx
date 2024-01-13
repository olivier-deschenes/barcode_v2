import { Button } from "../../../components/ui/button";
import { useBarcodesStore } from "../../../stores/barcodes";
import { FormInput } from "./FormInput";
import { Header } from "./Header";

export function Sidebar() {
  const reset = useBarcodesStore((s) => s.reset);
  const activePageId = useBarcodesStore((s) => s.activePageId);

  return (
    <div
      className={
        "flex flex-col w-1/3 print:hidden h-screen sticky top-0 justify-center items-center"
      }
    >
      <Header />
      <FormInput />
      <Button onClick={reset}>Reset</Button>
      <kbd>{activePageId}</kbd>
    </div>
  );
}
