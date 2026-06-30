import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/services/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather App",
  description: "Your simple and reliable weather companion. View detailed 10-hour forecasts and a complete 7-day forecast with real-time weather updates.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex items-center justify-center ">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
