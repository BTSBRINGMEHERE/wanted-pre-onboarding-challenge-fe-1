import { atom } from "recoil";

interface ISnackbarItemProps {
  id: string;
  type: "notice" | "warning" | "caution";
  message: string;
}

export const snackbarState = atom<ISnackbarItemProps[]>({
  key: "snackbarState",
  default: <ISnackbarItemProps[]>[]
});
