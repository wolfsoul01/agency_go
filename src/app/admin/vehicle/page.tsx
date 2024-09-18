"use client";
import { DataTable } from "@/components/table/table-date";
import { useVehicle } from "./hooks/useVehicles";
import { columnsVehicles } from "./components/columns-vehicles";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/shared/modal";
import FormVeihcle from "./components/form-vehicle";

function Vehicle() {
  const { data, isFetching ,refetch} = useVehicle();

  const [showModal, setShowModal] = useState(false);

  const callback = ()=>{
    setShowModal(false)
    refetch()
  }
  return (
    <section>
      <header className="flex justify-between">
        <div></div>

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

      <div>
        <DataTable
          columns={columnsVehicles}
          data={data}
          keySearch={"year"}
          isLoading={isFetching}
        />
      </div>

      <Modal open={showModal} close={() => setShowModal(false)} size="3xl">
        <FormVeihcle  callback={callback}/>
      </Modal>
    </section>
  );
}

export default Vehicle;
