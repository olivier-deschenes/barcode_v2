import React from "react";
import JsBarcode from "jsbarcode";
import { Code128Type } from "../../../../stores/barcodes";

type Props = {
  barcode: Code128Type;
};
export function Barcode128({ barcode }: Props) {
  const _id = React.useMemo(() => `BarCode-${barcode.id}`, [barcode.id]);

  React.useEffect(() => {
    JsBarcode(`#${_id}`, barcode.value || "x", {
      format: "CODE128",
      lineColor: "black",
      width: 2,
      displayValue: true,
      text: barcode.title || "\n",
    });
  }, [_id, barcode.title, barcode.value]);

  return (
    <div className={"scale-90"}>
      <svg id={_id}></svg>
    </div>
  );
}
