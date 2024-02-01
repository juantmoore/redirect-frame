import type { NextApiRequest, NextApiResponse } from 'next';

// Ensure the environment variables are defined
const apiKey = process.env.API_KEY;
const apiVersion = process.env.API_VERSION;

if (!apiKey || !apiVersion) {
  throw new Error('API_KEY or API_VERSION is not defined in the environment variables');
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-CC-Api-Key': apiKey,
  'X-CC-Version': apiVersion,
};

export default async function createCharge(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.commerce.coinbase.com/charges', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred' });
  }
}
