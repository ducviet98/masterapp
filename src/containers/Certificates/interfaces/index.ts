export type CertificateType = {
  id: number,
  name: string,
  csr: string,
  key: string,
  mfi_account_number?: number,
  company_name?: string,
  certificate: string,
  created_at: string,
  updated_at: string,
}