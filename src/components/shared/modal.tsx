import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  close: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const modalVariants = cva("", 
  {
  variants: {
    size: {
      sm: "max-w-sm", // Pequeño
      md: "max-w-md", // Mediano
      xl: "max-w-xl", // Grande
      "2xl": "max-w-2xl", // Extra Grande
      "3xl": "max-w-3xl", // Super Grande
      "4xl": "max-w-4xl", 
      "5xl": "max-w-5xl", 
    },
  },
  defaultVariants: {
    size: "xl", // value for default
  },
});
function Modal(props: Props) {
  const { open, title, close, children, description, size = "md" } = props;
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className={cn(modalVariants({size}), "")}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
