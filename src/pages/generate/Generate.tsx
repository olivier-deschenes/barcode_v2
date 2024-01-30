import React from "react";
import { PagesContainer } from "./barcode-pages/PagesContainer";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { BarcodeType, useBarcodesStore } from "../../stores/barcodes";
import { Barcode128 } from "./barcode-pages/barcodes/Barcode128";
import { Sidebar } from "./sidebar/Sidebar";
import { twJoin } from "tailwind-merge";

export function Generate() {
  const swapBarcodes = useBarcodesStore((s) => s.swapBarcodes);
  const getBarcodeFromId = useBarcodesStore((s) => s.getBarcodeFromId);

  const [dragginBarcode, setDragginBarcode] =
    React.useState<BarcodeType | null>(null);

  const onDragEnd = React.useCallback(
    (e: DragEndEvent) => {
      const fromBarcodeId = e.active.id;

      const toSpacerId = e.over?.id;

      if (!toSpacerId) return;

      swapBarcodes(String(fromBarcodeId), String(toSpacerId));
    },
    [swapBarcodes]
  );

  const onDragStart = React.useCallback(
    (e: DragEndEvent) => {
      const fromBarcodeId = e.active.id;

      setDragginBarcode(getBarcodeFromId(String(fromBarcodeId)));
    },
    [getBarcodeFromId]
  );

  const isDragging = dragginBarcode && dragginBarcode.type === "CODE_128";

  return (
    <div
      className={
        "flex print:bg-transparent flex-1 print:p-0 gap-8 print:gap-0 print:w-screen print:max-w-none"
      }
    >
      <Sidebar />
      <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className={"flex flex-1 justify-center"}>
          <PagesContainer />
        </div>
        <DragOverlay
          dropAnimation={null}
          className={twJoin(isDragging && "cursor-grabbing")}
        >
          {isDragging && <Barcode128 barcode={dragginBarcode} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
