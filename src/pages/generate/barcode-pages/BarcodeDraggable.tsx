import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Barcode128 } from "./barcodes/Barcode128";
import { Cross2Icon, GearIcon } from "@radix-ui/react-icons";
import { Code128Type, useBarcodesStore } from "../../../stores/barcodes";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { BarcodeModal } from "./BarcodeModal";

type Props = {
  barcode: Code128Type;
};
export function BarcodeDraggable({ barcode }: Props) {
  const deleteBarcode = useBarcodesStore((s) => s.deleteBarcode);

  const [menuOpen, setMenuOpen] = React.useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
  } = useDraggable({
    id: barcode.id,
    data: barcode,
  });

  const { setNodeRef: droppableRef } = useDroppable({
    id: barcode.id,
    data: barcode,
  });

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleDelete = () => {
    deleteBarcode(barcode.id);

    toast.success("Barcode deleted", {
      important: true,
    });
  };

  return (
    <div
      className={
        "flex justify-center items-center p-5 rounded relative cursor-grab"
      }
      style={{
        width: "calc(100% - 2.5rem)",
        height: "calc(100% - 2.5rem)",
      }}
      onMouseEnter={handleMenuOpen}
      onMouseLeave={handleMenuClose}
      ref={droppableRef}
    >
      <div
        className={twMerge(
          "absolute top-0 right-0 flex gap-3 z-50 print:hidden",
          !menuOpen && "hidden"
        )}
      >
        <BarcodeModal barcode={barcode}>
          <Button size={"icon"} variant={"outline"}>
            <GearIcon className="size-5" />
          </Button>
        </BarcodeModal>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <Cross2Icon className="size-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                barcode.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <button
        ref={draggableRef}
        {...listeners}
        {...attributes}
        className={"max-w-full overflow-hidden cursor-grab"}
      >
        <Barcode128 barcode={barcode} />
      </button>
    </div>
  );
}
