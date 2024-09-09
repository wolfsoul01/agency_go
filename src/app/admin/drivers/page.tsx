"use client";
import { DataTable } from "@/components/table/table-date";
import { columnsDriver } from "./components/drivers-columns";
import { useDriver } from "./hooks/useDrivers";

function Drivers() {
  const { data: driver, isFetching } = useDriver();

  console.log(driver);

  return (
    <section>
      <header>
        <h1>Drivers</h1>
      </header>

      <div>
        <DataTable
          columns={columnsDriver}
          data={driver}
          keySearch={"firstName"}
          isLoading={isFetching}
        />
      </div>
    </section>
  );
}

export default Drivers;
