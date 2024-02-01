import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = 'https://commerce-frame-6r9h.vercel.app';
const frameMetadata = getFrameMetadata({
  buttons: [{ label: 'Click to unlock', action: 'post_redirect' }],
  image: `${NEXT_PUBLIC_URL}/onchain.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Base Beanies',
  description: 'Exclusive Base beanies for Warpcaster users',
  openGraph: {
    title: 'Base Beanies',
    description: 'Exclusive Base beanies for Warpcaster users',
    images: [NEXT_PUBLIC_URL],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <img src={'/onchain.png'} />
    </>
  );
}
