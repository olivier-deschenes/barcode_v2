import { create } from "zustand";
import { persist } from "zustand/middleware";

export type IBarcode = {
  id: string;
  value: string;
  title?: string;
};

export type Code128 = IBarcode & {
  type: "CODE_128";
};

export type Spacer = {
  id: string;
  type: "SPACER";
};

export type Barcode = Code128 | Spacer;

export type BarcodePage = {
  id: string;
  barcodes: Barcode[];
};

interface BarcodesState {
  pages: BarcodePage[];
  activePageId: BarcodePage["id"];

  addPage: (page: BarcodePage) => void;
  addBarcode: (barcode: Barcode) => void;

  setActivePageId: (id: BarcodePage["id"]) => void;
  getActivePage: () => BarcodePage;

  reset: () => void;
}

export const createBarcodePage = () => {
  const barcodes = new Array(10).fill(null).map(() => {
    const spacer: Spacer = {
      id: crypto.randomUUID(),
      type: "SPACER",
    };

    return spacer;
  });

  const page: BarcodePage = {
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
      };
    },
    {
      name: "barcodes-storage",
    }
  )
);
