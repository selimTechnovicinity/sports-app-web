// types/toast.ts
export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
  title?: string;
}

export interface ToastContextProps {
  showToast: (message: string, type?: ToastType, title?: string) => void;
}
