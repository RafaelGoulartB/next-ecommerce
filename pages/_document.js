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

            <script type="text/javascript" src="https://d0b4-18-228-40-209.ngrok.io/init.js" async></script>
          `,
          }}
        />
      </body >
    </Html >
  )
}

