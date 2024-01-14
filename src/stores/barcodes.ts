import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BaseBarcode = {
  id: string;
  value: string;
  title?: string;
};

export type Code128Type = BaseBarcode & {
  type: "CODE_128";
};

export type SpacerType = {
  id: string;
  type: "SPACER";
};

export type BarcodeType = Code128Type | SpacerType;

export type BarcodePageType = {
  id: string;
  barcodes: BarcodeType[];
};

interface BarcodesState {
  pages: BarcodePageType[];
  activePageId: BarcodePageType["id"];

  addPage: (page: BarcodePageType) => void;
  addBarcode: (barcode: BarcodeType) => void;

  setActivePageId: (id: BarcodePageType["id"]) => void;
  getActivePage: () => BarcodePageType;

  getIndexedFromId: (barcodeId: BarcodePageType["id"]) => {
    pageIndex: number;
    pageCount: number;
    barcodeIndex: number;
    barcodeCount: number;
  };
  getBarcodeFromId: (barcodeId: BarcodeType["id"]) => BarcodeType;

  swapBarcodes: (fromId: BarcodeType["id"], tooId: BarcodeType["id"]) => void;

  reset: () => void;
}

export const createBarcodePage = () => {
  const barcodes = new Array(10).fill(null).map(() => {
    const spacer: SpacerType = {
      id: crypto.randomUUID(),
      type: "SPACER",
    };

    return spacer;
  });

  const page: BarcodePageType = {
    id: crypto.randomUUID(),
    barcodes,
  };

  return page;
};

export const useBarcodesStore = create<BarcodesState>()(
  persist(
    (set, state) => {
      const defaultPage = createBarcodePage();

      return {
        pages: [defaultPage],
        addPage: (page) =>
          set((state) => ({
            pages: [...state.pages, page],
          })),
        activePageId: defaultPage.id,
        setActivePageId: (id) => set({ activePageId: id }),
        getActivePage: () => {
          const _state = state();
          const activePageId = _state.activePageId;

          const page = _state.pages.find((p) => p.id === activePageId);

          if (!page) {
            throw new Error("No active page");
          }

          return page;
        },
        addBarcode: (barcode) => {
          set((state) => {
            const activePage = state.getActivePage();
            const barcodes = [...activePage.barcodes];

            const spacerIndex = barcodes.findIndex((b) => b.type === "SPACER");

            /**
             * If there are no spacers,
             * we need to add a new page and add the barcode there.
             */
            if (spacerIndex === -1) {
              const newPage = createBarcodePage();
              newPage.barcodes[0] = barcode;

              return {
                pages: [...state.pages, newPage],
                activePageId: newPage.id,
              };
            }

            barcodes[spacerIndex] = barcode;

            const newPage = {
              ...activePage,
              barcodes: barcodes,
            };

            const newPages = state.pages.map((p) => {
              if (p.id === state.activePageId) {
                return newPage;
              }

              return p;
            });

            return {
              pages: newPages,
            };
          });
        },
        reset: () => {
          const defaultPage = createBarcodePage();

          set({ pages: [defaultPage], activePageId: defaultPage.id });
        },
        getIndexedFromId: (barcodeId) => {
          const _state = state();

          for (
            let pageIndex = 0;
            pageIndex < _state.pages.length;
            pageIndex++
          ) {
            const page = _state.pages[pageIndex];
            const barcodeIndex = page.barcodes.findIndex(
              (b) => b.id === barcodeId
            );

            if (barcodeIndex !== -1) {
              return {
                pageIndex,
                pageCount: _state.pages.length,
                barcodeIndex,
                barcodeCount: page.barcodes.length,
              };
            }
          }

          throw new Error("Barcode not found");
        },
        swapBarcodes: (fromId, tooId) => {
          set((state) => {
            const from = state.getIndexedFromId(fromId);
            const too = state.getIndexedFromId(tooId);

            const pages = [...state.pages];

            const fromPage = pages[from.pageIndex];
            const tooPage = pages[too.pageIndex];

            const fromBarcode = fromPage.barcodes[from.barcodeIndex];
            const tooBarcode = tooPage.barcodes[too.barcodeIndex];

            fromPage.barcodes[from.barcodeIndex] = tooBarcode;
            tooPage.barcodes[too.barcodeIndex] = fromBarcode;

            pages[from.pageIndex] = fromPage;
            pages[too.pageIndex] = tooPage;

            return {
              pages,
            };
          });
        },
        getBarcodeFromId: (barcodeId) => {
          const _state = state();

          const { pageIndex, barcodeIndex } =
            _state.getIndexedFromId(barcodeId);

          const page = _state.pages[pageIndex];
          const barcode = page.barcodes[barcodeIndex];

          return barcode;
        },
      };
    },
    {
      name: "barcodes-storage",
    }
  )
);
