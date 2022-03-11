import { Html, Head, Main, NextScript, Script } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.NuVidioId = "rafael.nuvidio.test";
            window.NuVidioConfigs = {
              fabButton: true,
            }
          `,
          }}
        />
        <script type="text/javascript" src="https://b74f-18-228-40-209.ngrok.io/init.js" async></script>
      </body>
    </Html>
  )
}
