"use client";
import Link from "next/link";
import { CircleUser, Package2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/shared/theme-toggel";
import useSessionStore from "@/store/useSession";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user, clearSession } = useSessionStore.getState();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, [router, token]);

  const logout = () => {
    clearSession();
    router.replace("/");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid min-h-screen w-full ">
        <div className="flex flex-col">
          <header className="flex h-16 items-center justify-evenly gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">

            <div className="flex  gap-x-3">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Agency-Go</span>
              </Link>
              <ModeToggle />
            </div>

            <div className="flex pr-12 py-2 mx-auto h-full  ">
              <h1 className="text-4xl font-bold mb-8 text-center">
                Reserva tu Alojamiento y Transporte
              </h1>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="uppercase">
                  {user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
