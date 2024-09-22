/* eslint-disable @next/next/no-img-element */
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
  Loader2,
  UsersIcon,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import query from "@/lib/axios.config";
import { Reservation } from "@/interfaces/server-interface";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { es } from "date-fns/locale";
import img from "@/assets/placeholder.png";
import SkeletonReservationDetails from "@/app/client/components/skeleton-reservation";
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

  const {
    data: reservation,
    isFetching,
    isError,
  } = useQuery<Reservation>({
    queryKey: ["reservations", id],
    queryFn: () => fetchReservations(+id),
    initialData: undefined,
  });

  const confirmationMutation = useMutation({
    mutationFn: (reservationId: number) =>
      query.patch(`/reservations/confirm/${reservationId}`),
    onSuccess: () => {
      toast.success("Reserva confirmada con éxito");
      router.refresh()
    },
    onError: () => {
      toast.error("Hubo un error al confirmar la reserva");
    },
  });
  const cancellationMutation = useMutation({
    mutationFn: (reservationId: number) =>
      query.delete(`/reservations/cancel/${reservationId}`),
    onSuccess: () => {
      toast.success("Reserva cancelada con éxito");
      router.refresh()
    },
    onError: () => {
      toast.error("Hubo un error al confirmar la reserva");
    },
  });

  const confirmation = () => {
    if (reservation?.id) {
      confirmationMutation.mutate(reservation.id);
    }
  };

  const cancellation = () => {
    if (reservation?.id) {
      cancellationMutation.mutate(reservation.id);
    }
  };

  if (isError) return <p>No se pudo obtener los datos</p>;
  if (isFetching) return <SkeletonReservationDetails/>;

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

                <div className="flex gap-x-3">
                  {reservation?.status === "Pending" && (
                    <Button
                      className="bg-green-500"
                      onClick={confirmation}
                      disabled={confirmationMutation.isPending} // Deshabilitar el botón durante la petición
                    >
                      {confirmationMutation.isPending ? (
                        <Loader2 className="animate-spin" /> 
                      ) : (
                        "Confirmar"
                      )}
                    </Button>
                  )}

                  {/* Botón de Cancelar */}
                  {reservation?.status !== "Cancelled" && (
                    <Button
                      variant={"destructive"}
                      onClick={cancellation}
                      disabled={confirmationMutation.isPending} // Deshabilitar si está confirmando
                    >
                      {confirmationMutation.isPending ? (
                       <Loader2 className="animate-spin" />
                      ) : (
                        "Cancelar"
                      )}
                    </Button>
                  )}
                </div>
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
