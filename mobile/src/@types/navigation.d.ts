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
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      firstSteps: undefined;
      riskLocationsMap: undefined;
      signUp: SignUpParams;
      signIn: SignInParams;
      riskLocationDetails: RiskLocationDetailsParams;
      selectMapPosition: undefined;
      riskLocationForm: RiskLocationFormParams;
      forum: undefined;
      profile: undefined;
    }
  }
}