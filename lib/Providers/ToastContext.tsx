// context/ToastContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { ToastState, ToastContextProps } from "@/types/toast";
import Toast from "@/components/Toaster/Toast";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: ToastState["type"] = "success",
    title?: string
  ) => {
    setToast({ open: true, message, type, title });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={toast.open}
        onClose={hideToast}
        message={toast.message}
        type={toast.type}
        title={toast.title}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
