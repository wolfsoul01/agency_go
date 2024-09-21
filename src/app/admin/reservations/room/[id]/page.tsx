"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BedDoubleIcon,
  CalendarIcon,
  ClipboardListIcon,
  CreditCardIcon,
  HomeIcon,
  UsersIcon,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { Reservation } from "@/interfaces/server-interface";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { es } from "date-fns/locale";
import img from "@/assets/placeholder.png";
const fetchReservations = async (id: number) => {
  try {
    const response = await query.get(`/reservations/${id}`, {});
    return response.data;
  } catch (error) {
    toast.error("No se pudo obtener los datos");
    // window.location.href = "/";
  }
};

function ReservationDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { data: reservation, isFetching } = useQuery<Reservation>({
    queryKey: ["reservations", id],
    queryFn: () => fetchReservations(+id),
    initialData: undefined,
  });

  console.log(reservation);

  if (isFetching) return <p>Cargando...</p>;
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

      <div>
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-3xl font-bold">
                  Reservation Details
                </CardTitle>
                <Badge
                  variant={
                    reservation?.status === "Confirmed"
                      ? "default"
                      : "secondary"
                  }
                >
                  {reservation?.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Fecha inicio:</span>
                    <span>
                      {format(reservation?.startDate as Date, "PPP", {
                        locale: es,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Fecha fin:</span>
                    <span>
                      {format(reservation?.endDate as Date, "PPP", {
                        locale: es,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClipboardListIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Total días:</span>
                    <span>{reservation?.days}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <UsersIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Personas:</span>
                    <span>
                      {reservation?.totalPersones ||
                        reservation?.room?.totalPersons}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCardIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Costo total:</span>
                    <span>{formatCurrency(reservation?.totalCost)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">
                  Información de la habitación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-muted rounded-md overflow-hidden"
                  >
                    <img
                      src={reservation?.room?.Image?.url || img.src}
                      alt={reservation?.room?.name}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <div className="space-y-2">
                    <h4 className="text-xl font-medium">
                      {reservation?.room?.name}
                    </h4>
                    <p className="text-gray-600">
                      {reservation?.room?.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <BedDoubleIcon className="h-5 w-5 text-gray-500" />
                      <span>Capacidad: {reservation?.room?.totalPersons}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HomeIcon className="h-5 w-5 text-gray-500" />
                      <span>Estado: {reservation?.room?.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCardIcon className="h-5 w-5 text-gray-500" />
                      <span>
                        Precio por noche:{" "}
                        {formatCurrency(reservation?.room?.pricePerNight)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {reservation?.customerNotes && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">Customer Notes</h3>
                    <p className="text-gray-600">
                      {reservation?.customerNotes}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ReservationDetails;
