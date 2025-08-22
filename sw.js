const CACHE_NAME = 'eve-chat-cache-v1';
// 需要被缓存的核心文件列表
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/production.js',
  '/database.js',
  '/main.js',
  '/auth.js',
  // 把你的图标也加进来
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// 监听 'install' 事件，当PWA被首次安装时触发
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 监听 'fetch' 事件，拦截所有的网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在缓存中找到了匹配的资源，就直接返回它
        if (response) {
          return response;
        }
        // 否则，就正常发起网络请求
        return fetch(event.request);
      })
  );
});