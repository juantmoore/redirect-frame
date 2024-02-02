import { NextRequest, NextResponse } from 'next/server';
import { ChargeRequestBody } from '../../../types/commerceTypes';

const apiKey = process.env.API_KEY;
const apiVersion = process.env.API_VERSION;
const commerceApiUrl = 'https://api.commerce.coinbase.com/charges';

const requestBody: ChargeRequestBody = {
  local_price: {
    amount: '1.50',
    currency: 'USD',
  },
  metadata: {
    name: 'Boddy',
    email: 'frames@gmail',
    address: '123',
  },
  pricing_type: 'fixed_price',
  name: 'Base Beaneies',
  description: '',
  redirect_url: '',
};

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');
requestHeaders.set('Accept', 'application/json');
requestHeaders.set('X-CC-Api-Key', `${apiKey}`);
requestHeaders.set('X-CC-Version', `${apiVersion}`);

async function createCharge(chargeData: ChargeRequestBody): Promise<any> {
  try {
    const response = await fetch(commerceApiUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(chargeData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<any>;
  } catch (error) {
    throw new Error('Failed to create charge: ' + error);
  }
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const r = await createCharge(requestBody);
  console.log(`r: ${r}`);
  return NextResponse.redirect('https://commerce-frame-6r9h.vercel.app/redirect', { status: 302 });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
