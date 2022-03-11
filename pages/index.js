import Warning from '../components/alerts/warnig';
import Page from '../components/page';
import ProductSection from '../components/productSection';

export default function Index() {
  return (
    <Page>
      {process.env.NODE_ENV === 'production' && (
        <Warning message="This is not a real e-commerce, it is just a code exercise." />
      )}
      <ProductSection />
      {/*
      <button id="nuvidio-widget-button">Widget</button>

      {
        typeof window !== 'undefined' && (
          <div
            dangerouslySetInnerHTML={{
              __html: `
            <script src=“https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.development.js” integrity=“sha256-4gJGEx/zXAxofkLPGXiU2IJHqSOmYV33Ru0zw0TeJ30=” crossorigin=“anonymous”></script>
    <script src=“https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.development.min.js” integrity=“sha256-9xBa2Hcuh2S3iew36CzJawq7T9iviOAcAVz3bw8h3Lo=” crossorigin=“anonymous”></script>
    <script>
      !(function (t) {
  if (!document.getElementById(t)) {
    var n = document.createElement(‘div’);
    n.id = t;
    document.body.appendChild(n);
  }
})(‘nuvidio-widget’);
!(function (t) {
  if (!document.getElementById(t)) {
    var n = document.createElement(‘div’);
    n.id = t;
    var i = document.getElementById(‘nuvidio-widget’);
    i.appendChild(n);
  }
})(‘nuvidio-widget-container’);
(function(window) {
  if (window.NuVidioWidget) {
    return
  }
  window.NuVidioWidget = {};
  window.NuVidioWidget._c = []
  const methods = [‘init’];
  methods.forEach(methodName => {
    window.NuVidioWidget[methodName] = function() {
      window.NuVidioWidget._c.push([methodName, arguments]);
    }
  });
})(window);
!(function (t, e, r) {
  if (!document.getElementById(t)) {
    var n = document.createElement(‘script’);
    for (var a in ((n.src =
      ‘https://f2c5-18-228-40-209.ngrok.io/main.js’),
    (n.type = ‘text/javascript’),
    (n.id = t),
    (n.async = true),
    r))
    n.onload = (() => {
      if (window.NuVidioWidget._c.length > 0) {
        window.NuVidioWidget._c.forEach((f) => {
          switch(f[0]) {
            case ‘init’:
              window.NuVidio.init(...f[1]);
              break;
          }
        });
      } else {
        if (window.NuVidio && window.NuVidioId) {
          window.NuVidio.init(window.NuVidioId, window.NuVidioConfigs);
        }
      }
      window.NuVidioWidget.init = window.NuVidio.init;
    });
    r.hasOwnProperty(a) && n.setAttribute(a, r[a]);
    var i = document.getElementById(‘nuvidio-widget’);
    i.appendChild(n);
  }
})(‘nuvidio-widget-script’, 0, {
  crossorigin: ‘anonymous’,
});
    </script>
    <script>
      NuVidioWidget.init(“nuvidio-gustavo”, {
        fabButton: true,
        open: false,
        closeOnQuit: true,
        clientData: {
          pushToQueue: false,
        },
      });
    </script>
          `,
            }}
          />
        )

      } */}
    </Page>
  );
}
