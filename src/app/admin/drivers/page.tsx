"use client"
import { DataTable } from "@/components/table/table-date"
import { columnsDriver } from "./components/drivers-columns";


const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
  { id: 4, name: 'Dan', email: 'dan@example.com', age: 30 },
  { id: 5, name: 'Eve', email: 'eve@<EMAIL>', age: 28 },
  { id: 6, name: 'Eve', email: 'eve@<EMAIL>', age: 28 },
  { id: 7, name: 'Eve', email: 'e<EMAIL>', age: 28 },

];


function Drivers() {
  return (
    <section>
      <header>
        <h1>Drivers</h1>
      </header>


      <div>
      <DataTable columns={columnsDriver} data={data} />
      </div>
    </section>
  )
}

export default Drivers