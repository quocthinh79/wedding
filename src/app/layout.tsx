import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
  description:
    'Trân trọng kính mời bạn đến chung vui trong lễ thành hôn của Lê Quốc Thịnh và Đống Giai Nhân.',
  openGraph: {
    title: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
    description:
      'Trân trọng kính mời bạn đến chung vui trong lễ thành hôn của Lê Quốc Thịnh và Đống Giai Nhân.',
    images: ['/assets/images/wedding-images/DSC05243.jpg'],
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiệp Cưới Quốc Thịnh & Giai Nhân',
    description:
      'Trân trọng kính mời bạn đến chung vui trong lễ thành hôn của Lê Quốc Thịnh và Đống Giai Nhân.',
    images: ['/assets/images/wedding-images/DSC05243.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi'>
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
