import { Page } from "./Page";
import { createBarcodePage, useBarcodesStore } from "../../../stores/barcodes";
import React from "react";
import { FilePlus2Icon } from "lucide-react";
import { Button } from "../../../components/ui/button";

export function PagesContainer() {
  const setActivePageId = useBarcodesStore((s) => s.setActivePageId);
  const addPage = useBarcodesStore((s) => s.addPage);

  const pages = useBarcodesStore((s) => s.pages);

  const pageContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!pageContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageId = entry.target.getAttribute("data-page-id");

            if (!pageId) return;

            setActivePageId(pageId);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    const pages = pageContainerRef.current.querySelectorAll("[data-page-id]");

    pages.forEach((page) => observer.observe(page));

    return () => {
      pages.forEach((page) => observer.unobserve(page));
    };
  }, [setActivePageId]);

  return (
    <div
      className={
        "flex flex-col gap-8 print:gap-0 snap-y snap-mandatory scroll-smooth relative "
      }
      ref={pageContainerRef}
    >
      {pages.map((page, i, array) => (
        <Page key={i} isLastPage={i === array.length - 1} page={page} />
      ))}
      <Button
        className={
          "absolute left-1/2 transform -translate-x-1/2 bottom-0 flex gap-2.5 justify-center items-center my-5 print:hidden"
        }
        variant={"outline"}
        onClick={() => addPage(createBarcodePage())}
      >
        Add a page
        <FilePlus2Icon />
      </Button>
    </div>
  );
}
