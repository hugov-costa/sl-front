export interface Client {
  id?: number;
  user_id: number;
  code: number;
  document_number: string;
  name: string;
  trade_name: string;
  address: string;
  created_at?: string | null;
  updated_at?: string | null;
}
