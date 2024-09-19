export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  license: string;
  age: number;
  phoneNumber: string;
  userId: number;
  typeLicense: "A" | "B" | "C1" | "D1" | "D";
  image: Image;
}
export interface Image {
  id: number;
  url: string;
  description: string;
}

export interface Card {
  id: number;
  title: string;
  make: string;
  model: string;
  status: string;
  type: string;
  year: number;
  priceForDay: number;
  available: boolean;
}

export interface Login {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "DRIVER";
  isSuperAdmin: boolean;
  imageId: null;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  totalPersons: number;
  status: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE" | "OUT_OF_SERVICE";
  pricePerNight: number;
  available: boolean;
  imageId: null;
  createdAt: Date;
  updatedAt: Date;
  Image: Image;
  Address: Address | null;
}

export interface Municipalities {
  id: number;
  name: string;
  code: string;
  provinceId: number;
  createdAt: null;
  updatedAt: null;
}

export interface Provinces {
  id: number;
  name: string;
  code: string;
  countryId: null;
  createdAt: null;
  updatedAt: null;
}

export interface Address {
  id: number;
  street_1: string;
  description: string;
  city: string;
  coordinateLatitude: string;
  coordinateLongitude: string;
  postalCode: string;
  municipalityId: number;
  provinceId: number;
  Provinces :Provinces | null;
  Municipalities :Municipalities | null;
  createdAt: Date;
  updatedAt: Date;
}
