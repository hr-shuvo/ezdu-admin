import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const font = Nunito({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ezdu - Admin",
    description: "Manage applications - ezdu",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${font.className}`}>

        <main>{children}</main>

        <Toaster/>
        </body>
        </html>
    );
}
