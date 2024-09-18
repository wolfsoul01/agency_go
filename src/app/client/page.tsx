import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDaysIcon,
  CarIcon,
  MountainIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Ene",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Abr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Habitaciones
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Autos
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Choferes
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contacto
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Tu destino para rentas y servicios de calidad
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Habitaciones confortables, autos confiables y choferes
                  profesionales para hacer tu viaje inolvidable.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Reserva ahora</Button>
                <Button variant="outline">Aprende más</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Nuestros servicios
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Habitaciones</CardTitle>
                  <CardDescription>
                    Confort y comodidad garantizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarDaysIcon className="w-16 h-16 mb-4" />
                  <p>
                    Amplia variedad de habitaciones para todos los gustos y
                    presupuestos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Ver habitaciones</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Autos</CardTitle>
                  <CardDescription>Movilidad a tu alcance</CardDescription>
                </CardHeader>
                <CardContent>
                  <CarIcon className="w-16 h-16 mb-4" />
                  <p>
                    Flota de vehículos modernos y bien mantenidos para tu
                    comodidad.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Ver autos</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Choferes</CardTitle>
                  <CardDescription>
                    Experiencia y profesionalismo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserIcon className="w-16 h-16 mb-4" />
                  <p>
                    Conductores expertos para llevarte a donde necesites con
                    seguridad.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Ver choferes</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
              Estadísticas de reservas
            </h2>
            <Tabs defaultValue="habitaciones" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="habitaciones">Habitaciones</TabsTrigger>
                <TabsTrigger value="autos">Autos</TabsTrigger>
                <TabsTrigger value="choferes">Choferes</TabsTrigger>
              </TabsList>
              <TabsContent value="habitaciones">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservas de habitaciones</CardTitle>
                    <CardDescription>
                      Número de reservas en los últimos 6 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={data}>
                        <XAxis
                          dataKey="name"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Bar
                          dataKey="total"
                          fill="#adfa1d"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="autos">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservas de autos</CardTitle>
                    <CardDescription>
                      Número de reservas en los últimos 6 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={data}>
                        <XAxis
                          dataKey="name"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Bar
                          dataKey="total"
                          fill="#2563eb"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="choferes">
                <Card>
                  <CardHeader>
                    <CardTitle>Reservas de choferes</CardTitle>
                    <CardDescription>
                      Número de reservas en los últimos 6 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={data}>
                        <XAxis
                          dataKey="name"
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#888888"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Bar
                          dataKey="total"
                          fill="#f97316"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Inc. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
