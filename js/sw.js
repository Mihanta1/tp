const CACHE_NAME= `CT-v1`

self.addEventListener('install',(event)=>{
    event.waitUntil(
        (async()=>{
            const cache= await caches.open(CACHE_NAME)
            cache.addAll([
                '/',
                './movies.js',
                '../styles/main.css',
                '/fallBack.html'
            ])
        })
    )
})
const putInCache = async (request, response)=>{
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, response)
}

const cacheFirst = async ({request, fallBackUrl})=>{
    const responseFromCache = await caches.match(request)
    if(responseFromCache){
        return responseFromCache
    }
    try {
        const responseFromNetwork = await fetch(request)

        putInCache(request, responseFromNetwork.clone())
        return responseFromNetwork
    } catch (error) {
        const fallBackResponse = await caches.match(fallBackUrl)
        if(fallBackResponse){
            return fallBackUrl
        }
        return new Response("Network Error ...",{
            status:408,
            headers: {"Content-Type":"text/plain"}
    })
    }
}

self.addEventListener("fetch", (event)=>{
    event.respondWith(
        cacheFirst({
            request:event.request,
            fallBackUrl: "/fallBack.html"
        })
    )
})