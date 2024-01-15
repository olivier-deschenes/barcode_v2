import React from "react";
import { PagesContainer } from "./barcode-pages/PagesContainer";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { BarcodeType, useBarcodesStore } from "../../stores/barcodes";
import { Barcode128 } from "./barcode-pages/barcodes/Barcode128";

export function Generate() {
  const swapBarcodes = useBarcodesStore((s) => s.swapBarcodes);
  const getBarcodeFromId = useBarcodesStore((s) => s.getBarcodeFromId);

  const [dragginBarcode, setDragginBarcode] =
    React.useState<BarcodeType | null>(null);

  const onDragEnd = React.useCallback(
    (e: DragEndEvent) => {
      const fromBarcodeId = e.active.id;

      setDragginBarcode(getBarcodeFromId(String(fromBarcodeId)));

      const toSpacerId = e.over?.id;

      if (!toSpacerId) return;

      swapBarcodes(String(fromBarcodeId), String(toSpacerId));
    },
    [getBarcodeFromId, swapBarcodes]
  );

  return (
    <div
      className={
        "flex print:bg-transparent flex-1 container print:p-0 gap-8 print:gap-0 print:w-screen print:max-w-none"
      }
    >
      {/* <Sidebar /> */}
      <DndContext onDragEnd={onDragEnd}>
        <PagesContainer />
        <DragOverlay dropAnimation={null}>
          {dragginBarcode && dragginBarcode.type === "CODE_128" && (
            <Barcode128 barcode={dragginBarcode} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
