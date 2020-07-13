importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

var appVersion = '1.8.1-47';
var dataVersion = '2';
var vendorVersion = '2';
var bgVersion = '4';

// Detailed logging is very useful during development
workbox.setConfig({ debug: true });

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting();
workbox.core.clientsClaim();

var baseUrl = '/app/www/';
// var baseUrl = '/mdisplay/live/';

var precacheList = [
  {
    url: baseUrl + '',
    revision: appVersion,
  },
  {
    url: baseUrl + 'index.html',
    revision: appVersion,
  },
  {
    url: baseUrl + 'prayer-data.js',
    revision: dataVersion,
  },
  // vendors
  {
    url: baseUrl + 'assets/vendors/vue.min.js',
    revision: vendorVersion,
  },
  {
    url: baseUrl + 'assets/vendors/moment.min.js',
    revision: vendorVersion,
  },
  {
    url: baseUrl + 'assets/vendors/hijri.js',
    revision: vendorVersion,
  },
  {
    url: baseUrl + 'assets/vendors/reboot.css',
    revision: vendorVersion,
  },
  {
    url: baseUrl + 'assets/vendors/workbox-window.prod.umd.js',
    revision: vendorVersion,
  },
  // /icons
  {
    url: baseUrl + 'assets/images/icon.png',
    revision: vendorVersion,
  },
  {
    url: baseUrl + 'assets/images/favicon.png',
    revision: vendorVersion,
  },
  // /app
  {
    url: baseUrl + 'assets/js/translations.js',
    revision: appVersion,
  },
  {
    url: baseUrl + 'assets/js/app.js',
    revision: appVersion,
  },
  {
    url: baseUrl + 'assets/css/app.css',
    revision: appVersion,
  },
  {
    url: baseUrl + 'assets/css/theme-default.css',
    revision: appVersion,
  },
  // 'prayer-data-*.js',
  // 'assets/**/*.{css,js}',
];

var backgroundsList = [];

for (var i = 1; i <= 11; i++) {
  backgroundsList.push({
    url: baseUrl + 'backgrounds/' + i + '.jpg',
    revision: bgVersion,
  });
}

precacheList = precacheList.concat(backgroundsList);

// precache all the site files
workbox.precaching.precacheAndRoute(precacheList, {
  ignoreURLParametersMatching: [/.*/],
});

// workbox.routing.registerRoute(
//   new RegExp(baseUrl + 'backgrounds/.+.jpg'),
//   new workbox.strategies.CacheFirst({
//     // Use a custom cache name
//     cacheName: 'md-bg-' + bgVersion,
//   }),
// );
