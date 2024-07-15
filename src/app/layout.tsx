import { ReactQueryClientProvider, ChakraUiProvider } from "@/app/providers";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryClientProvider>
            <html lang="en">
                <body className="">
                    <ChakraUiProvider>{children}</ChakraUiProvider>
                </body>
            </html>
        </ReactQueryClientProvider>
    );
}
