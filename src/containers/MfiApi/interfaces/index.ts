export type MFiAPIType = {
  id: number;
  url: string;
  method: string;
  name: string;
  query: {
    [key: string]: string;
  }
  param: {
    [key: string]: string;
  }
  body: {
    [key: string]: string;
  }
  created_at: string;
  updated_at: string;
}