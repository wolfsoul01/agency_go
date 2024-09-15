"use client";
import { DataTable } from "@/components/table/table-date";
import { columnsDriver } from "./components/drivers-columns";
import { useDriver } from "./hooks/useDrivers";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Modal from "@/components/shared/modal";
import FormDriver from "./components/form-driver";
import { useState } from "react";
import { Label } from "@/components/ui/label";

function Drivers() {
  const { data: driver, isFetching, refetch } = useDriver();

  const [showModal, setShowModal] = useState(false);

  const callback = () => {
    setShowModal(false);
    refetch();
  };

  return (
    <section>
      <header className="flex items-center justify-between px-4">
        <Label className="text-2xl">Drivers</Label>

        <div>
          <Button
            className="flex gap-x-2 items-center"
            onClick={() => setShowModal(true)}
            variant={"outline"}
          >
            <PlusCircle /> Agregar
          </Button>
        </div>
      </header>

      <div>
        <DataTable
          columns={columnsDriver}
          data={driver}
          keySearch={"firstName"}
          isLoading={isFetching}
        />
      </div>
      <Modal size="5xl" close={() => setShowModal(false)} open={showModal}>
        <FormDriver callback={callback} />
      </Modal>
    </section>
  );
}

export default Drivers;
