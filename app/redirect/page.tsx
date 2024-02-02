// 'use client';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { GetServerSideProps } from 'next';
// const NEXT_PUBLIC_URL = 'https://commerce-frame-6r9h.vercel.app'; //replace me
// // interface RedirectPageProps {
// //   hostedUrl: string;
// // }

// export default function RedirectPage() {
//   useEffect(() => {
//     async function fetchHostedUrl() {
//       try {
//         const response = await fetch('/api/frame', { method: 'POST' });
//         const data = await response.json();

//         if (data.hostedUrl) {
//           window.location.href = data.hostedUrl;
//         } else {
//           console.error('Hosted URL not found');
//         }
//       } catch (error) {
//         console.error('Error fetching hosted URL:', error);
//       }
//     }

//     fetchHostedUrl();
//   }, []);

//   return (
//     <div>
//       <p>Redirecting...</p>
//     </div>
//   );
// }

'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const youtubeUrl = 'https://www.youtube.com/watch?v=MwCn50ZVPGQ&feature=youtu.be';

    // Perform the redirect
    window.location.href = youtubeUrl; // For a full page reload redirect
    // Or use Next.js router for client-side redirect (comment out the line above if using this)
    // router.push(youtubeUrl);
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
