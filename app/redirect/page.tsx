'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
const NEXT_PUBLIC_URL = 'https://commerce-frame-6r9h.vercel.app'; //replace me
// interface RedirectPageProps {
//   hostedUrl: string;
// }

export default function RedirectPage() {
  useEffect(() => {
    async function fetchHostedUrl() {
      try {
        const response = await fetch('/api/frame', { method: 'POST' });
        const data = await response.json();

        if (data.hostedUrl) {
          window.location.href = data.hostedUrl;
        } else {
          console.error('Hosted URL not found');
        }
      } catch (error) {
        console.error('Error fetching hosted URL:', error);
      }
    }

    fetchHostedUrl();
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
