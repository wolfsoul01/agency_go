/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Room } from "@/interfaces/server-interface";
import query from "@/lib/axios.config";
import { Loader2Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  defaultValue?: Room;
}

export default function FormRoomHeader({defaultValue} : Props) {
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const handleDeleted = async (id: number) => {
    setIsDeleted(true);
    try {
      await query.delete(`/room/${id}`).finally(() => setIsDeleted(false));
      router.back();
    } catch (error: any) {
      toast.error(error.message[0]);
    }
  };
  return (
    <div className="flex  justify-between p-5">
      <div>
        <CardTitle>Formulario de Habitación</CardTitle>
        <CardDescription>
          Por favor, ingrese los detalles de la habitación.
        </CardDescription>
      </div>

      {defaultValue && (
        <div>
          <Button
            variant={"destructive"}
            className="flex items-center gap-x-2 mt-auto"
            onClick={() => handleDeleted(defaultValue?.id as number)}
            type="button"
            disabled={isDeleted}
          >
            {isDeleted ? <Loader2Icon className="animate-spin" /> : <Trash />}{" "}
            Borrar
          </Button>
        </div>
      )}
    </div>
  );
}
