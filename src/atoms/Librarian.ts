import { atom } from "recoil";

const showCreateOrEditLibrarianState = atom<boolean>({
  key: "showCreateOrEditLibrarianState",
  default: false,
});

const isEditingLibrarianState = atom<boolean>({
  key: "isEditingLibrarianState",
  default: false,
});

const globalLibrarianState = atom<null | any>({
  key: "globalLibrarianState",
  default: null,
});

const librarianAtoms = {
  showCreateOrEditLibrarianState,
  isEditingLibrarianState,
  globalLibrarianState,
};

export default librarianAtoms;
