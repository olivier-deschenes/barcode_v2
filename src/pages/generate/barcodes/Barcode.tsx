import React from "react";
import JsBarcode from "jsbarcode";

type Props = {
  value: string;
  id: string;
};
export function Barcode({ value, id }: Props) {
  const _id = React.useMemo(() => `BarCode-${id}`, [id]);

  React.useEffect(() => {
    JsBarcode(`#${_id}`, "CODE128CODE128", {
      format: "CODE128",
      lineColor: "black",
      width: 2,
      displayValue: true,
    });
  }, [_id]);

  return (
    <div className={""}>
      <div className={"scale-90"}>
        <svg id={_id}></svg>
      </div>
    </div>
  );
}
