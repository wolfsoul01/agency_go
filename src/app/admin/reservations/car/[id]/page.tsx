"use client";
/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarIcon,
  CarIcon,
  GaugeIcon,
  FuelIcon,
  CreditCardIcon,
  ClipboardListIcon,
  Gauge,
  Zap,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Reservation } from "@/interfaces/server-interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import query from "@/lib/axios.config";
import img from "@/assets/placeholder.png";
import { Button } from "@/components/ui/button";
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

export default function DetallesReservaCoche() {
  const { id } = useParams();
  const router = useRouter();
  const { data: reservation, isFetching } = useQuery<Reservation>({
    queryKey: ["reservations", id],
    queryFn: () => fetchReservations(+id),
    initialData: undefined,
  });

  const confirmationMutation = useMutation({
    mutationFn: (reservationId: number) =>
      query.patch(`/reservations/confirm/${reservationId}`),
    onSuccess: () => {
      toast.success("Reserva confirmada con éxito");
      router.refresh();
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
      router.refresh();
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

  const [user ]
  if (isFetching) return <SkeletonReservationDetails/>;
  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">
              Detalles de la Reserva de Coche
            </CardTitle>
            <Badge>{reservation?.status}</Badge>


            <div className="flex items-center gap-/x-2">
              {reservation?.status === "Pending" && (
                <Button
                  className="bg-green-500"
                  onClick={confirmation}
                  disabled={confirmationMutation.isPending} 
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
                  disabled={confirmationMutation.isPending}
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
                <span className="font-medium">Fecha de inicio:</span>
                <span>
                  {format(reservation?.startDate as Date, "PPP", {
                    locale: es,
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Fecha de fin:</span>
                <span>
                  {format(reservation?.endDate as Date, "PPP", {
                    locale: es,
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ClipboardListIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Total de días:</span>
                <span>{reservation?.days}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Costo total:</span>
                <span>{formatCurrency(reservation?.totalCost)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Precio por día:</span>
                <span>{formatCurrency(reservation?.car?.priceForDay)}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Información del Coche</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AspectRatio
                ratio={16 / 9}
                className="bg-muted rounded-md overflow-hidden"
              >
                <img
                  src={reservation?.car?.image?.url || img.src}
                  alt={`${reservation?.car?.make} ${reservation?.car?.model}`}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              <div className="space-y-2">
                <h4 className="text-xl font-medium">
                  {reservation?.car?.title}
                </h4>
                <p className="text-gray-600">
                  {reservation?.car?.make} {reservation?.car?.model} (
                  {reservation?.car?.year})
                </p>
                <div className="flex items-center space-x-2">
                  <CarIcon className="h-5 w-5 text-gray-500" />
                  <span>Tipo: {reservation?.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GaugeIcon className="h-5 w-5 text-gray-500" />
                  <span>Estado: {reservation?.car?.status}</span>
                </div>
                {reservation?.car.km && (
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 mr-2 text-primary" />
                    <span>Kilometraje: {reservation?.car.km} km</span>
                  </div>
                )}
                {reservation?.car.acceleration && (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
                    <span>
                      Aceleración: {reservation?.car.acceleration} s (0-100
                      km/h)
                    </span>
                  </div>
                )}
                {reservation?.car.tank !== null && (
                  <div className="flex items-center space-x-2">
                    <FuelIcon className="h-5 w-5 text-gray-500" />
                    <span>Capacidad del tanque: {reservation?.car.tank} L</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {reservation?.customerNotes && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">Notas del Cliente</h3>
                <p className="text-gray-600">{reservation?.customerNotes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
