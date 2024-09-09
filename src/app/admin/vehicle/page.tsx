"use client"
import { DataTable } from "@/components/table/table-date";
import { useVehicle } from "./hooks/useVehicles";
import { columnsVehicles } from "./components/columns-vehicles";

function Vehicle() {
  const { data, isFetching } = useVehicle();
  return (
    <section>
      <header>
        <h1>Vehículos</h1>
      </header>

      <div>
        <DataTable
          columns={columnsVehicles}
          data={data}
          keySearch={"year"}
          isLoading={isFetching}
        />
      </div>
    </section>
  );
}

export default Vehicle;
