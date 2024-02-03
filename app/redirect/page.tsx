'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RedirectPage() {
  const router = useRouter();
  const { id } = router.query; // Get the 'id' query parameter

  useEffect(() => {
    if (id) {
      const hostedUrl = `https://commerce.coinbase.com/pay/${id}`;
      window.location.href = hostedUrl;
    }
  }, [id]); // Depend on 'id' to trigger effect

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
