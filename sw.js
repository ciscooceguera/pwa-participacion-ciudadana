const CACHE_APP = "participacion-ciudadana-v3";

const RECURSOS_APP = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./js/db.js",
    "./js/reporte-service.js",
    "./manifest.webmanifest",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-maskable-512.png"
];

const URL_RECURSOS_APP = new Set(
    RECURSOS_APP.map(
        (recurso) => new URL(recurso, self.location.href).href
    )
);

self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE_APP)
            .then((cache) => cache.addAll(RECURSOS_APP))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (evento) => {
    evento.waitUntil(
        caches.keys()
            .then((nombres) => Promise.all(
                nombres
                    .filter((nombre) => nombre !== CACHE_APP)
                    .map((nombre) => caches.delete(nombre))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (evento) => {
    const solicitud = evento.request;
    const url = new URL(solicitud.url);

    if (
        solicitud.method !== "GET" ||
        url.origin !== self.location.origin
    ) {
        return;
    }

    evento.respondWith(
        fetch(solicitud)
            .then(async (respuesta) => {
                if (
                    respuesta.ok &&
                    URL_RECURSOS_APP.has(url.href)
                ) {
                    const copia = respuesta.clone();

                    const cache = await caches.open(
                        CACHE_APP
                    );

                    await cache.put(
                        solicitud,
                        copia
                    );
                }

                return respuesta;
            })
            .catch(async () => {
                const recursoEnCache =
                    await caches.match(solicitud);

                if (recursoEnCache) {
                    return recursoEnCache;
                }

                if (solicitud.mode === "navigate") {
                    return caches.match("./index.html");
                }

                throw new Error(
                    "Recurso no disponible sin conexión."
                );
            })
    );
});
