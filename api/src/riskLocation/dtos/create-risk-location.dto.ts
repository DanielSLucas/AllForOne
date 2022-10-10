export interface CreateRiskLocationDTO {
  coords: {
    lat: number;
    long: number;
  };
  risk: string;
  description: string;
  created_by: string;
}
