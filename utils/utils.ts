import { ChargeRequestBody } from '../types/commerceTypes';

export const NEXT_PUBLIC_URL = 'https://commerce-frame-6r9h.vercel.app';
export const apiKey = process.env.API_KEY;
export const apiVersion = process.env.API_VERSION;
export const commerceApiUrl = 'https://api.commerce.coinbase.com/charges';
export const PRODUCT_PRICE_USD = '2.00';
export const ITEM_DESCRIPTION = '';
export const REDIRECT_URL = '';

export const createRequestHeaders = (): Headers => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  headers.set('X-CC-Api-Key', `${apiKey}`);
  headers.set('X-CC-Version', `${apiVersion}`);
  return headers;
};

const requestHeaders = createRequestHeaders();
export async function createCharge(chargeData: ChargeRequestBody): Promise<any> {
  try {
    const response = await fetch(commerceApiUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(chargeData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('Response before parsing:', response);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Failed to create charge:', error);
    throw new Error('Failed to create charge: ' + error);
  }
}
