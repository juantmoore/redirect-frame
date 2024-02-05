import { NextRequest, NextResponse } from 'next/server';
import { ChargeRequestBody } from '../../../types/commerceTypes';
import {
  PRODUCT_PRICE_USD,
  REDIRECT_URL,
  ITEM_DESCRIPTION,
  createCharge,
} from '../../../utils/utils';
import { FrameRequest, getFrameAccountAddress, getFrameMessage } from '@coinbase/onchainkit';

const requestBody: ChargeRequestBody = {
  local_price: {
    amount: PRODUCT_PRICE_USD,
    currency: 'USD',
  },
  metadata: {
    walletAddress: '123', //WALLET
  },
  pricing_type: 'fixed_price',
  name: 'Base Beaneies',
  description: ITEM_DESCRIPTION,
  redirect_url: REDIRECT_URL,
};

function buildRequestBody(address: string | undefined): ChargeRequestBody {
  const requestBody: ChargeRequestBody = {
    local_price: {
      amount: PRODUCT_PRICE_USD,
      currency: 'USD',
    },
    metadata: {
      walletAddress: address,
    },
    pricing_type: 'fixed_price',
    name: 'Base Beaneies',
    description: ITEM_DESCRIPTION,
    redirect_url: REDIRECT_URL,
  };
  return requestBody;
}

async function getResponse(req: NextRequest, hostedUrl: string): Promise<NextResponse> {
  return NextResponse.redirect(hostedUrl, { status: 302 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const addr = await getMetaData(req);
    console.log('user:', addr);
    const body = buildRequestBody(addr);
    const responseData = await createCharge(body);
    const hostedUrl = responseData.data.hosted_url;
    return getResponse(req, hostedUrl);
  } catch (error) {
    console.error('Error in POST function:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create charge' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function getMetaData(req: NextRequest) {
  let accountAddress: string | undefined = '';
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);
  console.log('body: ', body);

  if (isValid) {
    try {
      accountAddress = await getFrameAccountAddress(message, {
        NEYNAR_API_KEY: 'NEYNAR_API_DOCS',
      });
      return accountAddress;
    } catch (err) {
      console.error(err);
    }
  }
}

export const dynamic = 'force-dynamic';
