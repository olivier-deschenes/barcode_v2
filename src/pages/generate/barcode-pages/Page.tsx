import { twJoin } from "tailwind-merge";
import { BarcodePageType, useBarcodesStore } from "../../../stores/barcodes";
import React from "react";
import { BarcodeItem } from "./Barcode";

type Props = {
  isLastPage: boolean;
  page: BarcodePageType;
};

export function Page({ isLastPage, page }: Props) {
  const activePage = useBarcodesStore((s) => s.getActivePage());
  const pageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!pageRef.current || page.id !== activePage.id) return;

    //console.log("scrolling to page", page.id);

    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activePage.id, page.id]);

  const isPageEmpty = page.barcodes.every(
    (barcode) => barcode.type === "SPACER"
  );

  return (
    <div
      className={"flex shrink-0 h-screen print:h-auto snap-center"}
      data-page-id={page.id}
      ref={pageRef}
    >
      <div
        className={twJoin(
          "scale-75 bg-white shadow-2xl print:shadow-none grid-rows-5 gap-2 p-2 rounded aspect-letter w-full place-items-center h-full print:scale-100 print:w-[8.5in] print:h-[11.25in] grid grid-cols-2 justify-center items-center",
          !isLastPage && "break-after-page",
          isPageEmpty && "print:hidden"
        )}
      >
        {page.barcodes.map((barcode) => {
          return <BarcodeItem key={barcode.id} barcode={barcode} />;
        })}
      </div>
    </div>
  );
}
