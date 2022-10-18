export interface SignUpParams {
  cellphone: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      firstSteps: undefined;
      riskLocationsMap: undefined;
      signUp: SignUpParams;
      signIn: undefined;
    }
  }
}