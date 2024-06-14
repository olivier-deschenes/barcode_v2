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
              "border-2 cursor-pointer print:hidden flex w-full h-full justify-center items-center rounded-xl flex-col",
              "border-primary/50 hover:border-foreground/50 hover:bg-foreground/10",
              isOver && "border-primary bg-primary/10"
            )}
            ref={ref}
          >
            <div
              className={
                "text-foreground/40 font-bold flex gap-2 items-center justify-center "
              }
            >
              <PlusCircleIcon className={"text-primary"} />
            </div>
          </div>
        </BarcodeModal>
      </div>
    );
  }
);

Spacer.displayName = "Spacer";
