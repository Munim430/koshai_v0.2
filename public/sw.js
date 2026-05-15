self.addEventListener('install', (event) => {
  console.log('[v0] Service worker installing')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('[v0] Service worker activated')
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Network first strategy for API calls
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open('api-cache-v1').then((cache) => {
              cache.put(event.request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache on network error
          return caches.match(event.request).then((response) => {
            return response || new Response('Offline - no cached response', { status: 503 })
          })
        })
    )
  }
})
