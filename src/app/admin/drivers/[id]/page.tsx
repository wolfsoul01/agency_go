"use client";
import { useParams } from "next/navigation";
import React from "react";
import FormDriver from "../components/form-driver";
import { useDriverDetails } from "../hooks/useDriverDetails";

function DriverDetails() {
  const { id } = useParams();

  const { data, isSuccess } = useDriverDetails(+id);

  return (
    <section>
      <header>
        <h2>Detalles</h2>
      </header>

      <div>{isSuccess && <FormDriver defaultValue={data} />}</div>
    </section>
  );
}

export default DriverDetails;
