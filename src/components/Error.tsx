import { useBarcodesStore } from "../stores/barcodes";
import { Button } from "./ui/button";

export function Error() {
  const handleReload = () => {
    useBarcodesStore.persist.clearStorage();

    window.location.reload();
  };

  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <div
        className={
          "flex justify-center items-center flex-col bg-red-100 border-red-400 border-2 rounded px-10 py-5 gap-5"
        }
      >
        <h1>Somethings went wrong ...</h1>
        <Button onClick={handleReload}>Reload</Button>
      </div>
    </div>
  );
}
