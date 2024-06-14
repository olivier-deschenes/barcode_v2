import { Label } from "@radix-ui/react-label";
import { Button } from "../../../components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import {
  BarcodeType,
  Code128Type,
  MAX_TITLE_LENGTH,
  useBarcodesStore,
} from "../../../stores/barcodes";
import React from "react";
import { toast } from "sonner";
import { PlusCircleIcon, SaveIcon } from "lucide-react";

type Props = {
  barcode: BarcodeType;
};

export function BarcodeModal({
  barcode,
  children,
}: React.PropsWithChildren<Props>) {
  const modifyBarcode = useBarcodesStore((s) => s.modifyBarcode);
  const addBarcodeToBarcodeId = useBarcodesStore(
    (s) => s.addBarcodeToBarcodeId
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState<Code128Type["value"] | null>(null);
  const [title, setTitle] = React.useState<Code128Type["title"] | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_TITLE_LENGTH) return;

    setTitle(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 15) return;

    setValue(e.target.value);
  };

  const handleModalOpenChange = (open: boolean) => {
    setTitle(null);
    setValue(null);

    setIsOpen(open);
  };

  const isEmptyTitle = title === undefined || title === "";

  const handleSave = () => {
    // If the barcode is undefined, then we're creating a new barcode
    if (barcode.type === "SPACER") {
      const newBarcode: Code128Type = {
        id: crypto.randomUUID(),
        type: "CODE_128",
        value: value ?? "",
        title: title ?? "",
      };

      addBarcodeToBarcodeId(newBarcode, barcode.id);

      toast.success("Barcode added", {
        important: true,
      });
    } else {
      const modifiedBarcode: BarcodeType = {
        ...barcode,
        title: title ?? barcode.title,
        value: value ?? barcode.value,
      };

      modifyBarcode(barcode.id, modifiedBarcode);

      toast.success("Barcode saved", {
        important: true,
      });
    }

    handleModalOpenChange(false);
  };

  const _value =
    barcode.type === "CODE_128" ? value ?? barcode.value ?? "" : value ?? "";

  const _title =
    barcode.type === "CODE_128" ? title ?? barcode.title : title ?? "";

  const isAddBarcode = barcode.type === "SPACER";

  return (
    <Dialog onOpenChange={handleModalOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isAddBarcode ? "Add barcode" : "Edit barcode"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              className="col-span-3"
              type="text"
              value={_title}
              onChange={handleTitleChange}
              maxLength={MAX_TITLE_LENGTH}
              placeholder={isEmptyTitle ? "N/A" : undefined}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Value
            </Label>
            <Input
              id="username"
              className="col-span-3"
              type="text"
              value={_value}
              onChange={handleValueChange}
              maxLength={15}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            {isAddBarcode ? (
              <>
                Add barcode
                <PlusCircleIcon className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Save
                <SaveIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
