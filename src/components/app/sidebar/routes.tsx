import { CarTaxiFront, Home, Hotel, MapPin, NotebookPen, User, Wallet } from "lucide-react";

export const routes = [
  {
    href: "/admin",
    label: "Home",
    icon: <Home className="size-5" />,
  },
  {
    href: "/admin/routes",
    label: "Rutas",
    icon: <MapPin className="size-5" />,
  },
  {
    href: "/admin/vehicle",
    label: "Vehículos",
    icon: <CarTaxiFront className="size-5" />,
  },
  {
    href: "/admin/drivers",
    label: "Choferes",
    icon: <User className="size-5" />,
  },
  {
    href: "/admin/accommodation",
    label: "Alojamiento",
    icon: <Hotel className="size-5" />,
  },
  {
    href: "/admin/reservations",
    label: "Reservaciones",
    icon: <NotebookPen className="size-5" />,
  },
  {
    href: "/admin/wallet",
    label: "Balance Económico",
    icon: <Wallet className="size-5" />,
  },
];
