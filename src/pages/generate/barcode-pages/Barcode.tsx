import { BarcodeType } from "../../../stores/barcodes";
import { BarcodeDraggable } from "./BarcodeDraggable";
import { SpacerDroppable } from "./SpacerDroppable";

type Props = {
  barcode: BarcodeType;
};

export const BarcodeItem = ({ barcode }: Props) => {
  switch (barcode.type) {
    case "CODE_128":
      return <BarcodeDraggable key={barcode.id} barcode={barcode} />;
    case "SPACER":
      return <SpacerDroppable key={barcode.id} spacer={barcode} />;
    default:
      return null;
  }
};
