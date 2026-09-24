// SuperFoundry analytics — include on every superfoundry.dev page: <script src="/analytics.js"></script>
(function () {
  var ID = 'G-64S0MJXND2';
  if (!/(^|\.)superfoundry\.dev$/.test(location.hostname) || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ID);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
})();
