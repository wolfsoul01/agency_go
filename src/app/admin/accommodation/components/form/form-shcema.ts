import { z } from "zod";

export const formSchemaRoom = z.object({
    name: z.string().nonempty("El nombre es obligatorio"),
    description: z.string().optional(),
    totalPersons: z.preprocess(
      Number,
      z.number().min(1, "Debe haber al menos 1 persona")
    ),
    pricePerNight: z.preprocess(
      Number,
      z.number().min(0, "El precio debe ser positivo")
    ),
    status: z.enum([
      "AVAILABLE",
      "OCCUPIED",
      "MAINTENANCE",
      "RESERVED",
      "OUT_OF_SERVICE",
    ]),
    municipalityId: z.preprocess(Number,z.number().optional()),
    provinceId: z.preprocess(Number,z.number().optional()),
    city : z.string().optional(),
    street_1 : z.string().optional(),
  });
  
  export type IFormRoom = z.infer<typeof formSchemaRoom>;
  