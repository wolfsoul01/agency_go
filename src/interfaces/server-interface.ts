export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  license: string;
  age: number;
  phoneNumber: string;
  userId: number;
  typeLicense: "A" | "B" | "C1" | "D1" | "D";
}
