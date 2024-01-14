import { Page } from "./Page";
import { useBarcodesStore } from "../../../stores/barcodes";
import React from "react";

export function PagesContainer() {
  const setActivePageId = useBarcodesStore((s) => s.setActivePageId);
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
        "flex flex-col gap-8 print:gap-0 snap-y snap-mandatory scroll-smooth"
      }
      ref={pageContainerRef}
    >
      {pages.map((page, i, array) => (
        <Page key={i} isLastPage={i === array.length - 1} page={page} />
      ))}
    </div>
  );
}
