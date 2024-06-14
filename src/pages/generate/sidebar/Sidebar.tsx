import { Button } from "../../../components/ui/button";
import { useBarcodesStore } from "../../../stores/barcodes";
import { FormInput } from "./FormInput";
import { Header } from "./Header";

export function Sidebar() {
  const reset = useBarcodesStore((s) => s.reset);

  return (
    <aside
      className={
        "flex flex-col w-1/3 print:hidden h-screen sticky top-0 items-center gap-5 justify-between p-5"
      }
    >
      <Header />
      <FormInput />
      <Button onClick={reset}>Reset</Button>
    </aside>
  );
}
