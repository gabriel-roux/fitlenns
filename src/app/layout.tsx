import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLenns - Seu guia para uma vida mais saudável",
  description:
    "O FitLens é um aplicativo que te ajuda a manter uma alimentação saudável e equilibrada, com base nas suas necessidades diárias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-subids
          data-utmify-plus-signal
          async
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                      window.pixelId = "6793993446603559eebe6081";
                      var a = document.createElement("script");
                      a.setAttribute("async", "");
                      a.setAttribute("defer", "");
                      a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
                      document.head.appendChild(a);
                    `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '961026842577888');
            fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{
              display: 'none'
            }}
            src="https://www.facebook.com/tr?id=961026842577888&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
