export interface Product {
  id?: number;
  user_id: number;
  code: number;
  barcode: string;
  description: string;
  gross_weight: number;
  net_weight: number;
  price: number;
  created_at?: string | null;
  updated_at?: string | null;
}
