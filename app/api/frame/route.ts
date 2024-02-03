// import { NextRequest, NextResponse } from 'next/server';

// async function getResponse(req: NextRequest): Promise<NextResponse> {
//   //console.log('redirected:', req);
//   return NextResponse.redirect('https://commerce-frame-6r9h.vercel.app/redirect', { status: 302 });
// }

// // async function getResponse(hostedUrl: string): Promise<NextResponse> {
// //   return NextResponse.redirect(hostedUrl, { status: 302 });
// // }

// // export async function POST(req: NextRequest): Promise<Response> {
// //   const responseData = await createCharge(requestBody);
// //   const hostedUrl = responseData.data.hosted_url;
// //   return new Response(JSON.stringify({ hostedUrl }), {
// //     status: 200,
// //     headers: { 'Content-Type': 'application/json' },
// //   });
// // }

// export const dynamic = 'force-dynamic';
import { FrameRequest, getFrameAccountAddress, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { ChargeRequestBody } from '../../../types/commerceTypes';
const NEXT_PUBLIC_URL = 'https://commerce-frame-6r9h.vercel.app';

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
console.log('request headers: ', requestHeaders);

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

    console.log('Response before parsing:', response);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Failed to create charge:', error);
    throw new Error('Failed to create charge: ' + error);
  }
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (isValid) {
    try {
      accountAddress = await getFrameAccountAddress(message, { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
    } catch (err) {
      console.error(err);
    }
  }

  console.log('getResponse()');
  return NextResponse.redirect(`${NEXT_PUBLIC_URL}/redirect`, { status: 302 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const responseData = await createCharge(requestBody);
    const hostedUrl = responseData.data.hosted_url;
    console.log('hostedUrl: ', hostedUrl);
    return getResponse(hostedUrl); // Use the hostedUrl for redirection
  } catch (error) {
    console.error('Error in POST function:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create charge' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// export async function POST(req: NextRequest): Promise<Response> {
//   console.log('POST');
//   return getResponse(req);
// }

export const dynamic = 'force-dynamic';
