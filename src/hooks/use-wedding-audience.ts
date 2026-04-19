'use client';

import { useSearchParams } from 'next/navigation';

export type WeddingAudience = 'bride' | 'groom' | null;

const truthyValues = new Set(['1', 'true', 'yes', 'bride', 'groom']);

export const useWeddingAudience = (): WeddingAudience => {
  const searchParams = useSearchParams();

  const sideParam = searchParams.get('side') || searchParams.get('audience');

  if (sideParam === 'bride' || sideParam === 'groom') {
    return sideParam;
  }

  const brideParam = searchParams.get('bride');
  const groomParam = searchParams.get('groom');

  if (
    brideParam === '' ||
    (brideParam !== null && truthyValues.has(brideParam.toLowerCase()))
  ) {
    return 'bride';
  }

  if (
    groomParam === '' ||
    (groomParam !== null && truthyValues.has(groomParam.toLowerCase()))
  ) {
    return 'groom';
  }

  return null;
};
