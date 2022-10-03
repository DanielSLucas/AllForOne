export interface CreateRiskLocationDTO {
  coords: {
    x: number;
    y: number;
  };
  radius: number;
  risk: string;
  description: string;
}
