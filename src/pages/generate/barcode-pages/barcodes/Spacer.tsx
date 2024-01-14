import React from "react";
import { SpacerType, useBarcodesStore } from "../../../../stores/barcodes";
import { twMerge } from "tailwind-merge";

type Props = {
  spacer: SpacerType;
  isOver?: boolean;
};

export const Spacer = React.forwardRef<HTMLDivElement, Props>(
  ({ spacer, isOver }, ref) => {
    const getIndexedFromId = useBarcodesStore((s) => s.getIndexedFromId);

    const indexes = getIndexedFromId(spacer.id);

    return (
      <div className={"h-full w-full flex cursor-pointer m-5 p-5 select-none"}>
        <div
          className={twMerge(
            "border-foreground/10 border-4 print:hidden flex w-full h-full justify-center items-center rounded-xl hover:border-foreground/50 hover:bg-foreground/10flex-col",
            isOver && "border-foreground/50 bg-foreground/10"
          )}
          ref={ref}
        >
          <div className={"text-foreground/10 font-bold"}>{`Barcode ${
            indexes.barcodeIndex + 1
          }/${indexes.barcodeCount}`}</div>
        </div>
      </div>
    );
  }
);

Spacer.displayName = "Spacer";
