export interface ChargeRequestBody {
  local_price: {
    amount: string;
    currency: string;
  };
  metadata: {
    name: string;
    email: string;
    address: string;
  };
  pricing_type: 'fixed_price' | 'no_price';
  name: string;
  description: string;
  redirect_url: string;
}
