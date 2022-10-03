export interface CreateRiskLocationDTO {
  coords: {
    lat: number;
    long: number;
  };
  radius: number;
  risk: string;
  description: string;
}
