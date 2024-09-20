/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { toast } from "sonner";

export const manageError = (error: AxiosError) => {
  let errorMessage = null;

  //@ts-ignore
  errorMessage = error.response?.data.message as string;

  toast.error(errorMessage ?? "Ups.. a ocurrido un erro inesperado");
};
