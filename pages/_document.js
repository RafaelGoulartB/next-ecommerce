import { Html, Head, Main, NextScript, Script } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        <div
          dangerouslySetInnerHTML={{
            __html: `
            <script>
              window.NuVidioId = "rafael.nuvidio.test";
              window.NuVidioConfigs = {
                fabButton: true,
              }
            </script>

            // <script type="text/javascript" src="https://hmlwidget.nuvidio.com/init.js" async></script>
            <script type="text/javascript" src="https://370e-18-228-40-209.sa.ngrok.io/init.js" async></script>
          `,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="dc8ae365-5602-4692-8174-333d69a515c9";(function(){d = document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
          `,
          }}
        />
      </body >
    </Html >
  )
}

