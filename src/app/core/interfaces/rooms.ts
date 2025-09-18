export interface Rooms {
  idRoom?: number;
  roomNumber: string;
  roomType: string;
  activityRoom: string;
  roomDescription: string;
  level: string;
  costPerDay: number;
  registrationDate?: string; // Se usa string por el formato ISO de fechas
  modificationDate?: string;
  state?: "A" | "I";
}
