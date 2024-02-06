import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameAccountAddress, getFrameMessage } from '@coinbase/onchainkit';
import { createCharge, buildRequestBody } from '../../../utils/utils';

async function getResponse(req: NextRequest, hostedUrl: string): Promise<NextResponse> {
  return NextResponse.redirect(hostedUrl, { status: 302 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log(process.env.BLAH)
    console.log(process.env.API_VERSION)
    console.log('POST hit')
    console.log('req: ', req)
    const addr = await getMetaData(req);
    console.log("address: ", addr)
    const body = buildRequestBody(addr);
    console.log("body: ", body)
    const responseData = await createCharge(body);
    console.log("response: ", responseData)
    const hostedUrl = responseData.data.hosted_url;
    console.log({
      charge: responseData.data.id,
      user: addr,
    });
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
  const rawBody = await req.text()
  console.log("raw request body: ", rawBody)
  if(!rawBody){
    throw new Error("request body is empty")
  }
  let accountAddress: string | undefined = '';
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);
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
