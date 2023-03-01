export interface GlobalTypes {
  isLoading: boolean;
  errors: object | null;
}

export interface PayloadType {
  [data: string]: any;
}


export interface ActionType {
  type: string;
  payload: PayloadType;
}
