import { atom } from "recoil";

const showCreateOrEditBookWidgetState = atom<boolean>({
  key: "showCreateOrEditBookWidgetState",
  default: false,
});

const globalBookState = atom<any | null>({
  key: "globalBookState",
  default: null,
});

const isEditingBookState = atom<boolean>({
  key: "isEditingBookState",
  default: false,
});

const showCreateOrEditBookLocationWidgetState = atom<boolean>({
  key: "showCreateOrEditBookLocationWidgetState",
  default: false,
});

const showBookInfoWidgetState = atom<boolean>({
  key: "showBookInfoWidgetState",
  default: false,
});

const isEditingBookLocationState = atom<boolean>({
  key: "isEditingBookLocationState",
  default: false,
});

const bookAtoms = {
  showCreateOrEditBookWidgetState,
  globalBookState,
  isEditingBookState,
  showCreateOrEditBookLocationWidgetState,
  isEditingBookLocationState,
  showBookInfoWidgetState,
};

export default bookAtoms;
