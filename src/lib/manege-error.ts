/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const manageError = (error: any) => {
  const message = error.message ?? ("" as string | null);
  toast.error(message ?? "Ups.. a ocurrido un erro inesperado");
};
