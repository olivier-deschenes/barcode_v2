import React from "react";
import JsBarcode from "jsbarcode";
import { useDraggable } from "@dnd-kit/core";
import { Barcode128 } from "./barcodes/Barcode128";
import { Code128Type } from "../../../stores/barcodes";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../../../components/ui/hover-card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

type Props = {
  barcode: Code128Type;
};
export function BarcodeDraggable({ barcode }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: barcode.id,
    data: barcode,
  });

  const _id = React.useMemo(() => `BarCode-${barcode.id}`, [barcode.id]);

  React.useEffect(() => {
    JsBarcode(`#${_id}`, barcode.value, {
      format: "CODE128",
      lineColor: "black",
      width: 2,
      displayValue: true,
    });
  }, [_id, barcode.value]);

  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger asChild>
        <button ref={setNodeRef} {...listeners} {...attributes}>
          <Barcode128 barcode={barcode} />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side={"top"}>
        <div className="flex justify-between space-x-4 flex-col">
          <div className={"bg-red-400"}>
            <h1>Barcode details</h1>
          </div>
          <div>
            <div className={"flex items-center gap-5"}>
              <Label className={"w-1/3"}>Title</Label>
              <Input
                type="text"
                value={barcode.title ?? "N/A (Fallback to value)"}
                disabled
              />
            </div>
            <div className={"flex items-center gap-5"}>
              <Label className={"w-1/3"}>Value</Label>
              <Input type="text" value={barcode.value} disabled />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
