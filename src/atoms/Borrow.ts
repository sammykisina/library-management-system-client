import { atom } from "recoil";

const showReceiveBorrowedBookWidgetState = atom<boolean>({
  key: "showReceiveBorrowedBookWidgetState",
  default: false,
});

const globalBorrowState = atom<any | null>({
  key: "globalBorrowState",
  default: null,
});

const borrowAtoms = {
  showReceiveBorrowedBookWidgetState,
  globalBorrowState,
};

export default borrowAtoms;
