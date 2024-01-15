import React from "react";
import { SpacerType } from "../../../../stores/barcodes";
import { twMerge } from "tailwind-merge";
import { BarcodeModal } from "../BarcodeModal";
import { PlusCircleIcon } from "lucide-react";

type Props = {
  spacer: SpacerType;
  isOver?: boolean;
};

export const Spacer = React.forwardRef<HTMLDivElement, Props>(
  ({ spacer, isOver }, ref) => {
    return (
      <div className={"h-full w-full flex m-5 p-10 select-none"}>
        <BarcodeModal barcode={spacer}>
          <div
            className={twMerge(
              "border-foreground/10 border-4 cursor-pointer print:hidden flex w-full h-full justify-center items-center rounded-xl hover:border-foreground/50 hover:bg-foreground/10 flex-col",
              isOver && "border-foreground/50 bg-foreground/10"
            )}
            ref={ref}
          >
            <div
              className={
                "text-foreground/40 font-bold flex gap-2 items-center justify-center"
              }
            >
              <PlusCircleIcon />
              <span>Add barcode</span>
            </div>
          </div>
        </BarcodeModal>
      </div>
    );
  }
);

Spacer.displayName = "Spacer";
