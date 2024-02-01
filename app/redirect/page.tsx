'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const hostedUrl = 'https://commerce.coinbase.com/pay/db2affb4-b2c9-4b2b-b7f8-e89b8bbc69ac';

    // Perform the redirect
    window.location.href = hostedUrl; // For a full page reload redirect
    // Or use Next.js router for client-side redirect (comment out the line above if using this)
    // router.push(youtubeUrl);
  }, [router]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
