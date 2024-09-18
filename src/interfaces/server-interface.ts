
export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  license: string;
  age: number;
  phoneNumber: string;
  userId: number;
  typeLicense: "A" | "B" | "C1" | "D1" | "D";
  image:Image
}
export interface Image {
  id: number;
  url: string;
  description: string;
}

export interface Card {
  id:          number;
  title:       string;
  make:        string;
  model:       string;
  status:      string;
  type:        string;
  year:        number;
  priceForDay: number;
  available:   boolean;
}
