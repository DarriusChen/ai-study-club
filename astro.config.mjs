// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://darriuschen.github.io',
    base: '/ai-study-club/',
    integrations: [
      icon({
        include: {
          lucide: ['house', 'arrow-left'],
        },
      }),
    ],
    vite: {
      plugins: [
        {
          name: 'serve-public-slides-index',
          configureServer(server) {
            server.middlewares.use((req, _res, next) => {
              // Node 的 IncomingMessage 型別沒有 url，伺服器請求上仍有這個欄位。
              const request = /** @type {{ url?: string }} */ (req);
              const [path, query] = (request.url ?? '').split('?');
              if (/\/slides\/?$/.test(path)) {
                request.url = `${path.replace(/\/?$/, '/index.html')}${query ? `?${query}` : ''}`;
              }
              next();
            });
          },
        },
      ],
    },
  });
