import { CertificateType } from "src/containers/Certificates/interfaces";

export type MFiTokenType = {
  id: number,
  certificate: CertificateType,
  name: string,
  token_id: string,
  base64_token: string,
  crc32_in_hex: string,
  ppid: string,
  created_at: string,
  updated_at: string,
  request_id: string,
}