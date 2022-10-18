export interface SignUpParams {
  cellphone: string;
}

export interface RiskLocationDetailsParams {
  riskLocationId: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      firstSteps: undefined;
      riskLocationsMap: undefined;
      signUp: SignUpParams;
      signIn: undefined;
      riskLocationDetails: RiskLocationDetailsParams;
    }
  }
}