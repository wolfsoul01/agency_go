"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FormVeihcle from "../components/form-vehicle";
import { useDetailVehicle } from "../hooks/useDetailsVehicle";
import FormVehicleSkeleton from "../components/form-vehicle-skeleton";

function CardDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isFetching } = useDetailVehicle(+id);

  if (isFetching || !data) return <FormVehicleSkeleton />;

  return (
    <section>
      <header className="flex items-center gap-x-3 mb-3">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-x-2"
          size={"sm"}
          variant={"outline"}
        >
          {" "}
          <ArrowLeft /> Volver
        </Button>
      </header>

      <div>{data && <FormVeihcle defaultValue={data} />}</div>
    </section>
  );
}

export default CardDetails;
