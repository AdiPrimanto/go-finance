import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

function MyApp(
  { Component }: { Component: any },
  { pageProps }: { pageProps: any }
) {
  return (
    <div>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
