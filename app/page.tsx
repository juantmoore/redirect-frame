import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL, IMAGE_NAME, ITEM_DESCRIPTION, ITEM_TITLE } from '../utils/utils';

// const frameMetadata = getFrameMetadata({
//   buttons: [{ label: 'Buy', action: 'post_redirect' }],
//   image: `${NEXT_PUBLIC_URL}/${IMAGE_NAME}`,
//   post_url: `${NEXT_PUBLIC_URL}/api/frame`,
// });

// export const metadata: Metadata = {
//   title: ITEM_TITLE,
//   description: ITEM_DESCRIPTION,
//   openGraph: {
//     title: ITEM_TITLE,
//     description: ITEM_DESCRIPTION,
//     images: [NEXT_PUBLIC_URL],
//   },
//   other: {
//     ...frameMetadata,
//   },
// };

const frameMetadata = getFrameMetadata({
  buttons: [
      {label: 'Click to unlock', action: 'post_redirect'}
  ],
  image: 'https://redirect-frame-tau.vercel.app/onchain.png',
  post_url: 'https://redirect-frame-tau.vercel.app/api/frame',
});

export default function Page() {
  console.log(process.env.API_VERSION)
  

  return (
    <>
     <p>Yoo</p>
     <p>{process.env.NEXT_PUBLIC_BLAH}</p>
      <img src={`/${IMAGE_NAME}`} />
     
    </>
  );
}
