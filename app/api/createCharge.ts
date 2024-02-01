import type { NextApiRequest, NextApiResponse } from 'next';
import { ChargeRequestBody } from '../../types/commerceTypes';

const apiKey = process.env.API_KEY;
const apiVersion = process.env.API_VERSION;

if (!apiKey || !apiVersion) {
  throw new Error('API_KEY or API_VERSION is not defined in the environment variables');
}

const requestBody: ChargeRequestBody = {
  local_price: {
    amount: '1.50',
    currency: 'USD',
  },
  metadata: {
    name: '',
    email: 'bobby@axecapital.com',
    address: '123 Satoshi Lane',
  },
  pricing_type: 'no_price',
  name: '',
  description: '',
  redirect_url: 'https://google.com',
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-CC-Api-Key': apiKey,
  'X-CC-Version': apiVersion,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody), //JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
}
