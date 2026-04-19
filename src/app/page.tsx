import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HomeView } from '@/sections';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const title = 'Thiệp Cưới Quốc Thịnh & Giai Nhân';
const thumbnailPath = '/thumbnail.jpg';

const getDescription = (audience: 'bride' | 'groom' | null) => {
  if (audience === 'bride') {
    return 'Trân trọng kính mời bạn đến chung vui trong lễ vu quy của Đồng Giai Nhân và Lê Quốc Thịnh.';
  }

  if (audience === 'groom') {
    return 'Trân trọng kính mời bạn đến chung vui trong lễ tân hôn của Lê Quốc Thịnh và Đồng Giai Nhân.';
  }

  return 'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Lê Quốc Thịnh và Đồng Giai Nhân.';
};

const getAudience = async (searchParams: SearchParams) => {
  const params = await searchParams;

  if (!!params.bride) {
    return 'bride' as const;
  }

  if (!!params.groom) {
    return 'groom' as const;
  }

  return null;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const audience = await getAudience(searchParams);
  const description = getDescription(audience);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [thumbnailPath],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnailPath],
    },
  };
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeView />
    </Suspense>
  );
}
