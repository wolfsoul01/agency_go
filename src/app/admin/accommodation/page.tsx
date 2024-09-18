"use client";
import RoomView from "./components/accomodation-container";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/modal";
import FormRoom from "./components/form/form-room";
import { useRooms } from "./hooks/useRooms";

function Accommodation() {
  const [showModal, setShowModal] = useState(false);

  const { data, refetch } = useRooms();
  const callback = () => {
    setShowModal(false);
    refetch();
  };

  
  return (
    <section>
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Habitaciones</h2>

        <aside>
          <Button
            className="flex gap-x-2 items-center"
            onClick={() => setShowModal(true)}
            variant={"outline"}
          >
            <PlusCircle /> Agregar
          </Button>
        </aside>
      </header>

      <RoomView rooms={data} />

      <Modal size="4xl" open={showModal} close={() => setShowModal(false)}>
        <FormRoom callback={callback} />
      </Modal>
    </section>
  );
}

export default Accommodation;
