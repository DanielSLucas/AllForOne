import { RiskLocation } from "../screens/RiskLocationDetails";

export interface SignUpParams {
  cellphone: string;
}

export interface SignInParams {
  cellphone: string;
}

export interface RiskLocationDetailsParams {
  riskLocationId: string;
}

export interface RiskLocationFormParams {
  position: {
    latitude: number;
    longitude: number;
  };
  riskLocation?: RiskLocation;
}

export interface SelectMapPositionParams {
  riskLocation?: RiskLocation;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      firstSteps: undefined;
      riskLocationsMap: undefined;
      signUp: SignUpParams;
      signIn: SignInParams;
      riskLocationDetails: RiskLocationDetailsParams;
      selectMapPosition: SelectMapPositionParams;
      riskLocationForm: RiskLocationFormParams;
      forum: undefined;
      profile: undefined;
    }
  }
}