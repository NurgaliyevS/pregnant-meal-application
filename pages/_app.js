import "@/styles/globals.css";
import "@/styles/blog.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <script
        defer
        data-website-id="67f0b799a43d0b88a66f7942"
        data-domain="pregnantmeal.com"
        src="https://datafa.st/js/script.js"
      ></script>
    </SessionProvider>
  );
}
