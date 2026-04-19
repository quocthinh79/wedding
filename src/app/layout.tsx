import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://quocthinh-giainhan.vercel.app';

const thumbnailPath = '/thumbnail.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
  description:
    'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Lê Quốc Thịnh và Đống Giai Nhân.',
  openGraph: {
    title: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
    description:
      'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Lê Quốc Thịnh và Đống Giai Nhân.',
    url: siteUrl,
    siteName: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
    images: [
      {
        url: thumbnailPath,
        width: 1200,
        height: 630,
        alt: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
      },
    ],
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
    description:
      'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của Lê Quốc Thịnh và Đống Giai Nhân.',
    images: [thumbnailPath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi'>
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
