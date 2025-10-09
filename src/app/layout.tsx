import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import { Box } from "@mui/material";
import { ApplicationBar } from "@/components/elements/applicationBar/ApplicationBar";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foxhole Web Utils",
  description: "Created by Yinoguns",
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
          <ApplicationBar/>
          {/* TODO: make responseive */}
          <Box className={styles.pageSpace}>
            {children}
          </Box>
        </body>
      </Providers>
    </html>
  );
}
