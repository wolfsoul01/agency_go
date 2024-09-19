import * as React from "react";
import { CalendarIcon, CarIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import defaultImage from "@/assets/placeholder.png";

export default function ReservaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Reserva tu Alojamiento y Transporte
      </h1>

      <Card className="mb-8">
        <CardContent className="p-6">
          <Tabs defaultValue="alojamiento" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="alojamiento">Alojamiento</TabsTrigger>
              <TabsTrigger value="autos">Autos</TabsTrigger>
            </TabsList>
            <TabsContent value="alojamiento">
              <div className="flex flex-wrap gap-4">
                <Input className="flex-grow" placeholder="¿A dónde vas?" />
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <Input type="date" className="w-40" placeholder="Llegada" />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <Input type="date" className="w-40" placeholder="Salida" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Huéspedes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 huésped</SelectItem>
                    <SelectItem value="2">2 huéspedes</SelectItem>
                    <SelectItem value="3">3 huéspedes</SelectItem>
                    <SelectItem value="4">4+ huéspedes</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full sm:w-auto">
                  <SearchIcon className="mr-2 h-4 w-4" /> Buscar
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="autos">
              <div className="flex flex-wrap gap-4">
                <Input className="flex-grow" placeholder="Lugar de recogida" />
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <Input
                    type="date"
                    className="w-40"
                    placeholder="Fecha de recogida"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="text-muted-foreground" />
                  <Input
                    type="date"
                    className="w-40"
                    placeholder="Fecha de devolución"
                  />
                </div>
                <Button className="w-full sm:w-auto">
                  <SearchIcon className="mr-2 h-4 w-4" /> Buscar Autos
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="price-range">Rango de Precio</Label>
                {/* <Slider
                  id="price-range"
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  className="mt-2"
                /> */}
              </div>
              <div>
                <Label htmlFor="rating">Calificación mínima</Label>
                <Select>
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Seleccionar calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 estrellas</SelectItem>
                    <SelectItem value="4">4 estrellas</SelectItem>
                    <SelectItem value="5">5 estrellas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Servicios</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button variant="outline" className="justify-start">
                    <CarIcon className="mr-2 h-4 w-4" /> Estacionamiento
                  </Button>
                  <Button variant="outline" className="justify-start">
                    WiFi
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Piscina
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Gimnasio
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="md:col-span-3 space-y-6">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={defaultImage.src}
                    alt="Imagen del alojamiento"
                    className="rounded-lg object-cover w-full sm:w-1/3"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      Hotel Ejemplo {item}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Ubicación céntrica, a 5 min de la playa
                    </p>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            4.0 (250 reseñas)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Precio por noche desde
                        </p>
                        <p className="text-2xl font-bold">$120</p>
                        <Button className="mt-2">Reservar ahora</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
