export type AccessoryInfoType = {
  id: number;
  mfi_token_id: number;
  setup_id: string;
  setup_code: string;
  setup_salt: string;
  setup_verifier: string;
  setup_payload: string;
  product_data: string;
  cid: number;
  created_at: string;
  updated_at: string;
}