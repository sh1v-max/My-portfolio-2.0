import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Screenshots are exported straight from the browser as 24-bit PNGs, which
    // is why a 1586x894 capture weighed 1.76 MB. Converting at build time keeps
    // the PNGs as the editable source of truth while shipping WebP, and applies
    // to every image import without a single call site changing.
    //
    // An import may still opt out or override per file:
    //   import hero from "./hero.png?format=png"      // keep the original codec
    //   import card from "./card.png?w=600;1200&as=srcset"
    imagetools({
      defaultDirectives: (url) => {
        // An explicit directive in the import always wins over the defaults.
        if (url.searchParams.has('format') || url.searchParams.has('as')) {
          return new URLSearchParams()
        }
        return new URLSearchParams({
          format: 'webp',
          quality: '78',
          // Nothing on the site renders an image wider than ~950 CSS px, so
          // 1600 still covers a 2x display and only ever downscales — sharp
          // will not enlarge a smaller source to meet this.
          w: '1600',
          withoutEnlargement: 'true',
        })
      },
    }),
  ],
})
