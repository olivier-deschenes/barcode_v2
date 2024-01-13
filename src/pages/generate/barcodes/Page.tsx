import { twJoin } from "tailwind-merge";
import { Barcode } from "./Barcode";
import { BarcodePage, useBarcodesStore } from "../../../stores/barcodes";
import { Spacer } from "./Spacer";
import React from "react";

type Props = {
  isLastPage: boolean;
  page: BarcodePage;
};

export function Page({ isLastPage, page }: Props) {
  const activePageId = useBarcodesStore((s) => s.activePageId);
  const pageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!pageRef.current || page.id !== activePageId) return;

    console.log("scrolling to page", page.id);

    pageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activePageId, page.id]);

  return (
    <div
      className={"flex shrink-0 h-screen print:h-auto snap-center bg-red-50"}
      data-page-id={page.id}
      ref={pageRef}
    >
      <div
        className={twJoin(
          "scale-75 bg-white shadow-lg grid-rows-5 gap-2 p-2 rounded aspect-letter w-full place-items-center h-full print:scale-100 print:w-[8.5in] print:h-[11.25in] grid grid-cols-2 justify-center items-center",
          !isLastPage && "break-after-page"
        )}
      >
        {page.barcodes.map((barcode, i) => {
          switch (barcode.type) {
            case "CODE_128":
              return (
                <Barcode key={barcode.id} value={`${i}`} id={barcode.id} />
              );
            case "SPACER":
              return <Spacer key={barcode.id} value={`${i}`} id={barcode.id} />;
          }
        })}
      </div>
    </div>
  );
}
