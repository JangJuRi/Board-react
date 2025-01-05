import Nav from "@/app/common/Nav";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Do_Hyeon } from 'next/font/google';
import Footer from "@/app/common/Footer";

export const metadata = {
  title: '게시판',
  description: '게시판',
}

const font = Do_Hyeon({
    subsets: ['latin'], // 또는 preload: false
    weight: '400'
});

export default function RootLayout({ children }) {
  return (
        <html lang="ko">
        <head>
            <Script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" strategy="lazyOnload"></Script>
        </head>
        <body className={font.className}>
        <Nav/>
        <div className="container-fluid p-0">
            {children}
        </div>
        <Footer/>
        </body>
        </html>
  )
}
